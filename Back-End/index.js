const express = require("express");
const app = express();
const { readdirSync } = require("fs");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Serve static files from uploads directory
app.use('/uploads', express.static('/app/uploads'));

app.listen(process.env.PORT, () => {
  console.log("Server is runing");
});

readdirSync("./Router").map((r) => app.use("/api", require(`./Router/${r}`)));
