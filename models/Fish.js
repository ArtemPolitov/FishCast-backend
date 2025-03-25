import mongoose from "mongoose";

const fishSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: {
    en: { type: String, required: true },
    ru: { type: String, required: true },
    ua: { type: String, required: true },
  },
  description: {
    ru: { type: String, required: true },
    ua: { type: String, required: true },
  },
  preferred_weather: {
    en: [String],
    ru: [String],
    ua: [String],
  },
  best_fishing_season: {
    en: [String],
    ru: [String],
    ua: [String],
  },
  preferred_bait: {
    en: [String],
    ru: [String],
    ua: [String],
  },
  optimal_water_temperature: [Number],
  optimal_pressure: [Number],
  image_url: { type: String, required: true },
}, { collection: 'fishes' }); // Указываем имя коллекции

const Fish = mongoose.model('Fish', fishSchema);

export default Fish;
