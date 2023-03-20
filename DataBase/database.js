const mongoose = require("mongoose");

const databaseConnection = () => {
  const dbUri = process.env.DB_URI
  mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `MongoDb Database Connected to the Server`
      );
    })
    .catch((err) => {
         console.log(`Some Database Connection Error Occured :- ${err}`);
    });
};

module.exports = databaseConnection;