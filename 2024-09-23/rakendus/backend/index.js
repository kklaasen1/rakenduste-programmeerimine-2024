const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const app = express();
const port = 8080;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const JWT_SECRET = "your_secret_key";

app.get('/token', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'Name is required' });
  }

  const token = jwt.sign({ name: name }, JWT_SECRET, { expiresIn: '1h' });
  
  res.send({ token });
});

app.post('/verify', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).send({ message: 'Token is required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }

    res.send({ message: 'Token is valid', decoded });
  });
});

const catsRoutes = require("./routes/cats.routes");
const exampleRoutes = require("./routes/example.routes");
const todosRoutes = require("./routes/todos.routes");

app.use("/cats", catsRoutes);
app.use("/examples", exampleRoutes);
app.use("/todos", todosRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// npm run dev --> localhost:8080