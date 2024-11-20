document.addEventListener('DOMContentLoaded', function () {
  // Registration form submission with validation
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
          e.preventDefault();

          const name = document.getElementById('name').value.trim();
          const age = document.getElementById('age').value;
          const email = document.getElementById('email').value.trim();
          const password = document.getElementById('password').value;
          const confirmPassword = document.getElementById('confirmPassword').value;

          if (password !== confirmPassword) {
              alert('Passwords do not match!');
              return;
          }

          // Data validation and sanitization
          if (!name || !age || !email || !password) {
              alert('Please fill all fields');
              return;
          }

          const response = await fetch('/auth/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, age, email, password })
          });

          if (response.ok) {
              alert('Registration successful! Please log in.');
              window.location.href = 'login.html';
          } else {
              alert('Registration failed. Please try again.');
          }
      });
  }

  // Login form submission with redirection to dashboard
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
          e.preventDefault();

          const email = document.getElementById('email').value.trim();
          const password = document.getElementById('password').value;

          if (!email || !password) {
              alert('Please enter both email and password');
              return;
          }

          const response = await fetch('/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
          });

          if (response.ok) {
              const data = await response.json();
              localStorage.setItem('token', data.token); // Save JWT token
               // Store the email in the session after successful login
               
              alert('Login successful!');
              //req.session.userEmail = user.email;
        
              
              window.location.href = 'homepage.html';
          } else {
              alert('Login failed. Please check your credentials.');
          }
      });
  }

  // Reset password form submission
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  if (resetPasswordForm) {
      resetPasswordForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = document.getElementById('email').value.trim();

          if (!email) {
              alert('Please enter your email');
              return;
          }

          const response = await fetch('/auth/reset-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email })
          });

          if (response.ok) {
              alert('Password reset link sent to your email');
          } else {
              alert('Error sending password reset link. Please try again.');
          }
      });
  }

  // Authentication check for dashboard
  const token = localStorage.getItem('token');
  if (document.body.contains(document.getElementById('dashboardContent'))) {
      if (!token) {
          alert('Please log in first');
          window.location.href = 'login.html';
      }
  }

  // Logout functionality
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
      logoutButton.addEventListener('click', () => {
          localStorage.removeItem('token');
          alert('Logged out successfully');
          window.location.href = 'login.html';
      });
  }
});
