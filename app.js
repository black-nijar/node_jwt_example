const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    msg: "Welcome to the api",
  });
});

app.post("/api/posts", (req, res) => {
  res.json({
    msg: "Post created",
  });
});

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    name: 'Nijar',
    email: 'nijar@g.com'
  }
  jwt.sign({ user }, 'secretkey', (err, token) => {
    if(err) throw err;
    res.json({ token });
  })
})
app.listen(5000, () => console.log("Server started on port 5000"));