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
