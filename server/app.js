const express = require("express");
const cors = require("cors");
const route = require("./routes/routes");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
 app.use(express.urlencoded({ extended: true }));
app.use("/api/main", route);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
