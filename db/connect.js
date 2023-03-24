const mongoose = require("mongoose");

const mongoConnect = (url) => mongoose.connect(url);

module.exports = mongoConnect;
