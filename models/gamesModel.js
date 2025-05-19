import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    platforms: { type: Array, required: true },
    developer: { type: String, required: true }
});

export const getAllGames = () => {
    return games;
}

// export const getGamesById = () => {
//     return  games.find(games => games.id === id);
// };

export default mongoose.model("games", gamesSchema);