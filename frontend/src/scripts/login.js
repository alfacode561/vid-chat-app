document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const identifierInput = document.getElementById('identifier');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('toggle-password');
    const rememberMeCheckbox = document.getElementById('remember-me');
    const errorMessages = document.getElementById('error-messages');
    const darkModeToggle = document.getElementById('dark-mode');

    // Password visibility toggle
    togglePasswordButton.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordButton.querySelector('i').classList.toggle('fa-eye');
        togglePasswordButton.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', darkModeToggle.checked);
    });

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
    }

    // Form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessages.innerHTML = '';

        const identifier = identifierInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = rememberMeCheckbox.checked;

        if (!identifier || !password) {
            showError('Please fill in all fields.');
            return;
        }

        try {
            const response = await login(identifier, password, rememberMe);
            if (response.success) {
                // Redirect to main app or dashboard
                window.location.href = '/dashboard';
            } else {
                showError(response.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            showError('An error occurred. Please try again later.');
            console.error('Login error:', error);
        }
    });

    // Social media login handlers
    document.querySelector('.google-login').addEventListener('click', () => socialLogin('google'));
    document.querySelector('.facebook-login').addEventListener('click', () => socialLogin('facebook'));
    document.querySelector('.github-login').addEventListener('click', () => socialLogin('github'));

    // Helper functions
    function showError(message) {
        errorMessages.textContent = message;
        errorMessages.style.display = 'block';
    }

    async function login(identifier, password, rememberMe) {
        // Implement your API call here
        // This is a placeholder implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'Login successful' });
            }, 1000);
        });
    }

    function socialLogin(provider) {
        // Implement social login logic here
        console.log(`Logging in with ${provider}`);
    }

    // Implement reCAPTCHA
    grecaptcha.ready(() => {
        grecaptcha.render('captcha', {
            'sitekey': 'YOUR_RECAPTCHA_SITE_KEY',
            'callback': onCaptchaVerified
        });
    });

    function onCaptchaVerified(token) {
        // Handle successful reCAPTCHA verification
        console.log('reCAPTCHA verified:', token);
    }

    // Rate limiting (frontend implementation)
    let loginAttempts = 0;
    const maxLoginAttempts = 5;
    const lockoutTime = 15 * 60 * 1000; // 15 minutes

    function checkRateLimit() {
        if (loginAttempts >= maxLoginAttempts) {
            const remainingTime = Math.ceil((parseInt(localStorage.getItem('lockoutEnd')) - Date.now()) / 1000);
            if (remainingTime > 0) {
                showError(`Too many login attempts. Please try again in ${remainingTime} seconds.`);
                return false;
            } else {
                loginAttempts = 0;
                localStorage.removeItem('lockoutEnd');
            }
        }
        return true;
    }

    function incrementLoginAttempts() {
        loginAttempts++;
        if (loginAttempts >= maxLoginAttempts) {
            localStorage.setItem('lockoutEnd', Date.now() + lockoutTime);
        }
    }
});
