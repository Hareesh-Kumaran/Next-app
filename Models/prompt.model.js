import { Schema, models, model } from "mongoose";

const promptSchema = new Schema({
  prompt: {
    type: String,
    required: [true, "prompt is required"],
  },
  tag: {
    type: String,
    default:"#"
  },
  creator: {
    ref:"user",
    type:Schema.Types.ObjectId
  },
},{timestamps:true});

const Prompt = models.prompt || model("prompt",promptSchema);

export default Prompt;
