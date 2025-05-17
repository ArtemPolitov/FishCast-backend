import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  region_id: { type: Number, required: true },
  name_uk: { type: String, required: true },
  name_en: { type: String, required: true },
  id: { type: Number, required: true },
});

const City = mongoose.model("City", citySchema);

export default City;