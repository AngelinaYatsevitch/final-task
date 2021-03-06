const express = require("express");
const port = 8080;

const app = express();
 
app.use("/", express.static(__dirname + "/dist"));

app.use("/", function(request, response){
    response.sendFile(__dirname + "/dist/index.html");
});
 
app.listen(port);