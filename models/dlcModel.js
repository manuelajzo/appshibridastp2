// import { dlc } from "../data/dlc.js";
import mongoose from "mongoose";

const dlcSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    game: { type: String, required: true },
    category: { type: String, required: true },
});

export const getAllDlc = () => {
    return dlc;
}

export const getDlcById = () => {
    return  dlc.find(dlc => dlc.id === id);
}

export default mongoose.model("dlcs", dlcSchema);