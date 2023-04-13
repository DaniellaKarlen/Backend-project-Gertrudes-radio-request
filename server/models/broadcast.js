import mongoose from "mongoose";

const broadcastSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must be a name"],
    trim: true,
  },
  description: {
    type: String,
  },
});

const Broadcast = mongoose.model("Broadcast", broadcastSchema);

export default Broadcast;
