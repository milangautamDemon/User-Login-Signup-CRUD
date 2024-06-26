const apiUrl = "http://localhost:3000/api/auth";

$(document).ready(function () {
  // Register user
  $("#registrationForm").submit(async function (e) {
    e.preventDefault();
    const userName = $("#userName").val();
    const password = $("#password").val();

    try {
      const response = await axios.post(`${apiUrl}/register`, {
        userName,
        password,
      });
      alert("User registered successfully");
      $("#registrationForm")[0].reset();
      loadUsers();
      window.location.href = "login.html";
      console.log(response.data.data);
    } catch (error) {
      console.error("There was an error registering the user!", error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        alert(`Failed to register user: ${error.response.data.msg}`);
      } else if (error.request) {
        console.error("Request made but no response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  });

  //load function
  async function loadUsers() {
    try {
      const response = await axios.get(`${apiUrl}/users`);
      console.log(response);
      const users = response.data.data;
      //check whether the users data receive or not
      console.log(users);
      //get table body element by id
      const tableBody = $("#user-table tbody");
      tableBody.empty(); // Clear existing table data

      users.forEach((user) => {
        const tableRow = `<tr id="data-row" data-username=${user.userName} data-id=${user.id}>
          <td>${user.id}</td>
          <td>${user.userName}</td>
        </tr>`;
        tableBody.append(tableRow);
      });
    } catch (error) {
      console.error(error);
    }
  }

  // login user
  $("#loginForm").submit(async function (e) {
    e.preventDefault();
    const userName = $("#userName").val();
    const password = $("#password").val();

    try {
      const response = await axios.post(`${apiUrl}/login`, {
        userName,
        password,
      });
      alert("User login successfully");
      $("#loginForm")[0].reset();
      window.location.href = "user.html";
      console.log(response.data);
    } catch (error) {
      console.error("There was an error login the user!", error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        alert(`Failed to login user: ${error.response.data.msg}`);
      } else if (error.request) {
        console.error("Request made but no response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  });

  // reset user
  $("#resetPasswordForm").submit(async function (e) {
    e.preventDefault();
    const userName = $("#userName").val();
    const oldPassword = $("#oldPassword").val();
    const newPassword = $("#newPassword").val();

    try {
      const response = await axios.put(`${apiUrl}/update`, {
        userName,
        oldPassword,
        newPassword,
      });
      alert("User password update successfully");
      $("#resetPasswordForm")[0].reset();
      window.location.href = "login.html";
      console.log(response.data);
    } catch (error) {
      console.error("There was an error updating user password !", error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        alert(`Failed to update user password: ${error.response.data.msg}`);
      } else if (error.request) {
        console.error("Request made but no response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  });

  //Initial load users when the document is ready
  loadUsers();
  // console.log(loadUsers());

  // Show user details in modal
  $("#user-table").on("click", "#data-row", function () {
    const userName = $(this).data("username");
    const id = $(this).data("id");
    $("#modalUsername").text(userName);
    $("#modalId").text(id);
    $("#userModal").modal("show");
  });
});
