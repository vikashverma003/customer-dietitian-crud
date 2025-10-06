const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    dietitianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dietitian",
    },
    advisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Advisor",
    },
    name: {
      type: String,
      max: 500,
    },
    profileImage: { type: String }, // store file path

    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
