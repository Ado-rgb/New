document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const endpoint1Btn = document.getElementById('endpoint1-btn');
  const endpoint2Btn = document.getElementById('endpoint2-btn');
  const apiKeyDisplay = document.getElementById('api-key-display');
  const responseDisplay = document.getElementById('response-display');

  let apiKey = localStorage.getItem('apiKey');
  if (apiKey) {
    apiKeyDisplay.textContent = apiKey;
  }

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    if (data.key) {
      apiKey = data.key;
      localStorage.setItem('apiKey', apiKey);
      apiKeyDisplay.textContent = apiKey;
      responseDisplay.textContent = JSON.stringify(data, null, 2);
    } else {
      responseDisplay.textContent = JSON.stringify(data, null, 2);
    }
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    if (data.key) {
      apiKey = data.key;
      localStorage.setItem('apiKey', apiKey);
      apiKeyDisplay.textContent = apiKey;
      responseDisplay.textContent = JSON.stringify(data, null, 2);
    } else {
      responseDisplay.textContent = JSON.stringify(data, null, 2);
    }
  });

  async function fetchEndpoint(endpoint) {
    if (!apiKey) {
      responseDisplay.textContent = 'No API Key found. Please register or login.';
      return;
    }
    const response = await fetch(`/api/${endpoint}`, {
      headers: { 'x-api-key': apiKey },
    });
    const data = await response.json();
    responseDisplay.textContent = JSON.stringify(data, null, 2);
  }

  endpoint1Btn.addEventListener('click', () => fetchEndpoint('endpoint1'));
  endpoint2Btn.addEventListener('click', () => fetchEndpoint('endpoint2'));
});
