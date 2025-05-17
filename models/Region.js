import mongoose from "mongoose";

const regionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  name_uk: { type: String, required: true },
  name_en: { type: String, required: true },
  id: { type: Number, required: true },
});

const Region = mongoose.model("Region", regionSchema);

export default Region;
