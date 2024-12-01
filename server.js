const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const userJson = path.join(__dirname, "data", "user.json");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/register", (req, res) => {
  //ユーザーネームとパスワード取得
  const registerName = req.body.name;
  const registerPassword = req.body.password;

  fs.readFile(userJson, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("サーバーエラー");
    }

    let users = [];
    if (data) users = JSON.parse(data);
    const userExists = users.some((user) => user.name === registerName);
    if (userExists) {
      return res.status(400).send("重複したユーザーネーム");
    }
    const newUser = { name: registerName, password: registerPassword };
    users.push(newUser);
    fs.writeFile(userJson, JSON.stringify(users, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing file:", writeErr);
        return res.status(500).send("サーバーエラー");
      }
      console.log(`${registerName}が登録されました`);
      res.send("ユーザ登録しました");
    });
  });
});

app.post("/login", (req, res) => {
  const loginName = req.body.name;
  const loginPassword = req.body.password;
  fs.readFile(userJson, "utf8", (err, data) => {
    let users = JSON.parse(data);
    let find = users.find(
      (user) => user.name === loginName && user.password === loginPassword
    );
    if (!find) {
      return res.status(400).send("ユーザーネームかパスワードが違います");
    }
    res.status(200).send("ログインしました");
  });
});
app.listen(80, () => console.log("Server started on port 80"));
