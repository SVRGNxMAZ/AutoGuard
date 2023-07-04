document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var ICNum = document.getElementById('ICNum').value;
    var Name = document.getElementById('Name').value;
  
    // Create a new user object
    var newUser = {
      UserID: username,
      Password: password,
      ICNum: ICNum,
      Name: Name
    };
  
    // Send a POST request to the server
    fetch('/SignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(function(response) {
      if (response.ok) {
        document.getElementById('message').textContent = 'Signup successful!';
      } else {
        document.getElementById('message').textContent = 'Signup failed!';
      }
    })
    .catch(function(error) {
      console.log('Error:', error);
      document.getElementById('message').textContent = 'An error occurred. Please try again later.';
    });
  });