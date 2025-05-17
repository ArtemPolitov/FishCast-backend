import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: {
    ru: { type: String, required: true },
    ua: { type: String, required: true },
  },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  region: {
    ru: {type: String, required: true},
    ua: {type: String, required: true},
    region_id: {type: Number, required: true,}
  },
  reservoir: {
    name :{
      ru: {type: String, required: true},
      ua: {type: String, required: true}
    },
    type:{type: String, required: true}
  },
  fish_species: [{ type: Number, required: true }],
  accessibility:{
    boat:{type: Boolean, required: true},
    shore:{type: Boolean, required: true}
  },
  description: {
    ru:{type:String, required: true},
    ua:{type:String, required: true}
  },
  image_url: { type: String, required: true },
}, { collection: 'locations' }); 

const Location = mongoose.model('Location', locationSchema);

export default Location;