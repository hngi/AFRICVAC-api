const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { Roles } = require("./../config/constants")


const UserSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false
    },
    role: {
      type: String,
      trim: true,
      enum: [Roles.USER],
      default: Roles.USER,
      select: false
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
    },
    number: {
      type: Number
    },
    username: {
      type: String,
      required: true
    },
    profileImageUrl: {
      type: String,
      default: "https://afrivac.s3.us-east-2.amazonaws.com/default.jpg"
    },
    passwordResetToken:{
      type: String,
      select: false
    },
    passwordResetExpires:{
      type: Date,
      select: false
    }
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});


let user

try {
  user = mongoose.model('users')
} catch (error) {
  user = mongoose.model('users', UserSchema)
}

module.exports = user
