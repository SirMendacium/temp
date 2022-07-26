const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const { Schema } = mongoose;


const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      required: true,
      type: String,
      unique: true
    },
    password: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  console.log(this.password)
  this.set("password", await bcrypt.hash(this.password, 10));
  next();
});

const Users = mongoose.model("User", userSchema);

module.exports = Users;
