const express = require('express');
const bodyParser = require("body-parser");

const appRoutes = require("./routes");

const PORT= 5000;
const app = express();
app.use(bodyParser.json());

app.use("/", appRoutes);


app.listen(PORT,()=>{
    console.log("Application started..");
});

