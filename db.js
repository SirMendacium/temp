const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    //await mongoose.connection.dropDatabase();

    mongoose.connection.on("error", (error) => {
      console.log(
        "Error mientras se tenía conexión con la base de datos.",
        error
      );
    });
  } catch (error) {
    console.error("Error al iniciar conexión con la base de datos.", error);
  }
};

module.exports = connect;
