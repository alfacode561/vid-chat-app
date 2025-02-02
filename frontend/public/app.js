document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    
    loginBtn.addEventListener('click', () => {
        window.open('login.html', '_blank');
    });
});
