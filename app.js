const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    msg: "Welcome to the api",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secret", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        msg: "Post created",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    name: "Nijar",
    email: "nijar@g.com",
  };
  jwt.sign({ user }, "secret", { expiresIn: "30s" }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
});

// Verify token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader != "undefined") {
    // Split the Space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // next middleware
    next();
  } else {
    // Denied
    res.sendStatus(403);
  }
}
app.listen(5000, () => console.log("Server started on port 5000"));
