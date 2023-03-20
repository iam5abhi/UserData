
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 200,
    match:[/^[a-zA-Z ]{2,30}$/,"Please fill the valid name"]
  },
  email: {
    type: String,
    required: [true, "Please Provide your email"],
    trim: true,
    unique: [true,"This Email is Already registerd && Please fill to an another Email "],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    minlength: 5,
    maxlength: 255,
    match: [
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/,
        "Please fill a valid email address",
      ],
  },
  role:{
    type:String,
    enum:['admin','user'],
    default:'user'
  },
  password: {
    type: String,
    required: [true, "Please provide a  password"],
    minlength: 5,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    minlength: 5,
    validate: {
      validator: function (Cpassword) {
        return Cpassword === this.password;
      },
      message: "Your password and confirmation password do not match",
    },
  },

},{timestamps: true});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt);
  this.confirmPassword = undefined;
  next();
});




UserSchema.methods.comparepassword=async function(password){return await bcrypt.compare(password,this.password)}



const Users = new mongoose.model("Users", UserSchema);

module.exports = Users;