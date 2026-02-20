const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required for creating a user"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email address",
      ],
      unique: [true, "Email already exists."],
    },
    name: {
      type: String,
      required: [true, "Name is required for creating an account"],
    },
    password: {
      type: String,
      required: [true, "Password is required for creating an account"],
      minlength: [6, "password should contain more than 6 character"],
      select: false, // ess ka mtlb ya hai ki jaha hum user ka data reterive kr rha hai to by default password nhi aaya  ga
    },
    systemUser: {
      // yaa kui ki  hm intially  tranction ka liya chahiya ya database se direct
      // true ho jaa aa ga
      type: Boolean,
      default: false,
      immutable: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  // jay se hm save kr rha hai  uss se pahle  run hoga
  if (!this.isModified("password")) {
    // if password is not modified
    return;
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  return;
});

userSchema.methods.comparePassword = async function (password) {
  console.log(password, this.password);

  return await bcrypt.compare(password, this.password);
  //bcrypt.compare if password right then true else false;
};
//.methods ek default Mongoose property hai. Ye allow karta hai:Custom functions add karna jo har document object pe available ho

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
