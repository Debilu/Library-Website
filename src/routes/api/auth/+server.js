import puppeteer from 'puppeteer';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sctcedenema';

export async function POST({ request, cookies }) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ error: 'Username and password required' }), { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    // Navigate to the login page
    await page.goto('https://sctce.etlab.in/user/login', { waitUntil: 'domcontentloaded' });

    // Wait for the login form fields
    try {
      await page.waitForSelector('input[name="LoginForm[username]"]', { timeout: 5000 });
      await page.waitForSelector('input[name="LoginForm[password]"]', { timeout: 5000 });
    } catch (selectorError) {
      console.error('Input fields not found:', selectorError.message);
      await browser.close();
      return new Response(JSON.stringify({ error: 'Login form fields not found' }), { status: 500 });
    }

    // Fill in the login form
    await page.type('input[name="LoginForm[username]"]', username, { delay: 50 });
    await page.type('input[name="LoginForm[password]"]', password, { delay: 50 });

    // Submit the form and wait for navigation
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);

    // Check if login failed by verifying the current URL or page content
    const currentUrl = page.url();
    if (currentUrl.includes('/user/login')) {
      await browser.close();
      return new Response(JSON.stringify({ error: 'Invalid login credentials' }), { status: 401 });
    }

    // Extract the user's name from the dropdown element
    const userInfo = await page.evaluate(() => {
      const nameElement = document.querySelector('li.dropdown a span.text');
      return {
        name: nameElement ? nameElement.innerText.trim() : 'Unknown'
      };
    });

    // Generate JWT token with the username
    const token = jwt.sign({ username: userInfo.name }, JWT_SECRET, { expiresIn: '1h' });

    // Set the JWT token as an HTTP-only cookie
    cookies.set('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 // 1 hour
    });

    await browser.close();

    return new Response(JSON.stringify({ message: 'Login successful', userInfo }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Login error:', error.message);
    return new Response(JSON.stringify({ error: 'Login failed', details: error.message }), { status: 500 });
  }
}
