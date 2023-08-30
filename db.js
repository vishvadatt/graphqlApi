const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/graphql-api"
const connect = mongoose.connect(url,{ useNewUrlParser: true });
connect.then((db) => {
    console.log("Database connected successfully...!");
})
.catch(e => {
    console.log("e.",e);
});