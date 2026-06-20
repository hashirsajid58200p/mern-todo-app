const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

console.log("Connecting to MongoDB...");
mongoose.connect(process.env.MONGO_URL_CLOUD, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("Connected successfully!");
    // Avoid ModelOverwriteError by checking if model exists
    const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({ email: String }));
    console.log("Finding user...");
    return User.findOne({}).maxTimeMS(5000);
  })
  .then((user) => {
    console.log("User found:", user);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
