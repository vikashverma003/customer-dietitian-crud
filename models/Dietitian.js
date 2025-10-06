const mongoose = require("mongoose");

const DietitianSchema = new mongoose.Schema(
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

    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dietitian", DietitianSchema);
