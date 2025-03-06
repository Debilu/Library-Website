import puppeteer from 'puppeteer';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sctcedenema';

let browser = null;

export async function POST({ request, cookies }) {
    const { username, password } = await request.json();

    if (!username || !password) {
        return new Response(JSON.stringify({ error: 'Username and password required' }), { status: 400 });
    }

    try {
        if (!browser) {
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
        }

        const page = await browser.newPage();

        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet') {
                request.abort();
            } else {
                request.continue();
            }
        });

        await page.goto('https://sctce.etlab.in/user/login', { waitUntil: 'domcontentloaded' });

        try {
            await page.waitForSelector('input[name="LoginForm[username]"]', { timeout: 5000 });
            await page.waitForSelector('input[name="LoginForm[password]"]', { timeout: 5000 });
        } catch (selectorError) {
            console.error('Input fields not found:', selectorError.message);
            await browser.close();
            browser = null;
            return new Response(JSON.stringify({ error: 'Login form fields not found' }), { status: 500 });
        }

        await page.type('input[name="LoginForm[username]"]', username, { delay: 50 });
        await page.type('input[name="LoginForm[password]"]', password, { delay: 50 });

        await Promise.all([
            page.click('button[type="submit"]'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);

        const currentUrl = page.url();
        if (currentUrl.includes('/user/login')) {
            const usernameError = await page.evaluate(() => {
                return document.querySelector('input[name="LoginForm[username]"] + .help-block-error')?.innerText.trim() || '';
            });
            const passwordError = await page.evaluate(() => {
                return document.querySelector('input[name="LoginForm[password]"] + .help-block-error')?.innerText.trim() || '';
            });
            const errorMessage = usernameError || passwordError || 'Invalid login credentials';

            return new Response(JSON.stringify({ error: 'Invalid login credentials', message: errorMessage }), { status: 401 });
        }

        const userInfo = await page.evaluate(() => {
            const nameElement = document.querySelector('li.dropdown a span.text'); // Corrected selector
            return {
                name: nameElement ? nameElement.innerText.trim() : 'Unknown'
            };
        });

        const token = jwt.sign({ username: userInfo.name }, JWT_SECRET, { expiresIn: '1h' });

        cookies.set('jwt', token, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600
        });

        return new Response(JSON.stringify({ message: 'Login successful', userInfo }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Login error:', error.message);
        return new Response(JSON.stringify({ error: 'Login failed', details: error.message }), { status: 500 });
    }
}