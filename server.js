//              DEPENDENCIES

const express = require("express");

const mongoose = require('mongoose');

const methodOverride = require("method-override");

const app = express();







//                  LISTENERs

const PORT = process.env.PORT
app.listen(PORT, () => console.log("express is a go", PORT));