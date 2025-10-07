const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdvisorSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },

    name: {
      type: String,
      max: 500,
    },
    profileImage: { type: String }, // store file path
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Hash password before save
AdvisorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
AdvisorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Advisor", AdvisorSchema);
