const express = require('express')
const app = express()
const port = 8080
const cors = require("cors");

const catsRoutes = require("./routes/cats.routes");
const exampleRoutes = require("./routes/example.routes");

app.use(express.json());

app.use("/cats", catsRoutes);
app.use("/examples", exampleRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example router listening on port ${port}`)
})

app.use(cors());