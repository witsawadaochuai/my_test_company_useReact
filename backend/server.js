const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/signup"));
app.use("/api/auth", require("./routes/login"));  

const authenticateToken = require("./middlewares/auth");
app.use("/api", authenticateToken, require("./routes/chart")); 

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
