try {
  let loginname = localStorage.getItem("name");
  let loginpassword = localStorage.getItem("password");
  if (loginname && loginpassword) {
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: loginname, password: loginpassword }),
    })
    .then((response) => {
      response.text().then((text) => {
        if (response.status === 200) {
          alert(text);
          document.getElementById("register").style.display = "none";
          document.getElementById("login").style.display = "none";
          dashboard.style.display = "block";
          document.getElementById("username").innerHTML = "login: " + localStorage.getItem("name");
          return;
        }
        localStorage.clear();
        alert(text);
      });
    })
    .catch((error) => {
      console.log(error);
    });
    dashboard.style.display = "block";
  }
} catch (error) {
  console.log(error);
}
let dashboard = document.getElementById("dashboard");
dashboard.style.display = "none";
function register() {
  let registerName = document.getElementById("registerName").value;
  let registerpassword = document.getElementById("registerPassword").value;
  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: registerName, password: registerpassword }),
  })
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      alert(text);
      alert("ログインしてください");
      document.getElementById("register").style.display = "none";
    })
    .catch((error) => {
      console.log(error);
    });
}
function login() {
  let loginName = document.getElementById("loginName").value;
  let loginpassword = document.getElementById("loginPassword").value;
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: loginName, password: loginpassword }),
  })
    .then((response) => {
      response.text().then((text) => {
        if (response.status === 200) {
          alert(text);
          document.getElementById("register").style.display = "none";
          document.getElementById("login").style.display = "none";
          dashboard.style.display = "block";
          document.getElementById("username").innerHTML = "login: " + loginName;
          localStorage.setItem("name", loginName);
          localStorage.setItem("password", loginpassword);
          return;
        }

        alert(text);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
