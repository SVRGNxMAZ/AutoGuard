document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission

    const userID = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ UserID: userID, Password: password })
        });
    
        if (response.ok) {
          // Redirect to index.html if login is successful
          document.getElementById('message').textContent = 'Login successful!';
          setTimeout(function() {
            // Code to be executed after 2 seconds
            window.location.href = '/dashboard';
          }, 2000);
          
        } else {
          // Handle unsuccessful login here (e.g., display an error message)
          document.getElementById('message').textContent =('Invalid credentials. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
    }

});
