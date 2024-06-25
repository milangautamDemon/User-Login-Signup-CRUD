import axios from "axios";

$(document).ready(function () {
  const apiUrl = "http://localhost:3000/api/auth";

  // Register user
  $("#registrationForm").submit(function (e) {
    e.preventDefault();
    const userName = $("#userName").val();
    const password = $("#password").val();

    axios
      .post(`${apiUrl}/register`, { userName, password })
      .then((response) => {
        alert("User registered successfully");
        $("#registrationForm")[0].reset();
        window.location.href = "login.html";
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error registering the user!", error);
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
          alert(`Failed to register user: ${error.response.data.msg}`);
        } else if (error.request) {
          console.error(
            "Request made but no response received:",
            error.request
          );
        } else {
          console.error("Error setting up the request:", error.message);
        }
      });
  });
});
