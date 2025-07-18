async function login() {
    try {
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;

        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        });
        if (!response.ok) {
            throw new Error('Failed to login.');
        }

        const loginData = await response.json();
        localStorage.setItem('token', loginData.token);
        window.location.href = '../shop/resources.html';

    } catch (error) {}
};

async function signup() {
    try {
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        const response = await fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                email: email,
                confirmPassword
            })
        });

        if (!response.ok) {
            throw new Error('Failed to login.');
        }

        window.location.href = './login.html';

    } catch (error) {}
};

async function reset() {
    try {
        const email = document.getElementById('email').value;

        const response = await fetch('http://localhost:8080/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        });
        if (!response.ok) {
            throw new Error('Failed to reset.');
        }

        const resetData = await response.json();
        window.location.href = '../shop/resources.html';

    } catch (error) {}
};

async function newPassword() {
    try {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const token = params.get('token');
        const password = document.getElementById('password').value;

        const response = await fetch('http://localhost:8080/new-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                token,
                password: password
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error('Failed to set new password.');
        }

        if (response.ok) {
            window.location.href = data.redirectUrl;
        } else {
            alert(data.message || 'Something went wrong.');
        }

    } catch (error) {}
};