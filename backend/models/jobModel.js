const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
postedBy: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},


title: {
  type: String,
  required: true,
},

country: {
  type: String,
  required: true,
},

location: {
  type: String,
  required: true,
},

category: {
  type: String,
  required: true,
},

skills: {
  type: String,
  required: true,
},

description: {
  type: String,
  required: true,
},


},
{ timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
