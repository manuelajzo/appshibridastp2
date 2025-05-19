import gamesModel from "../models/gamesModel.js";

// Get all games
export const getAllGames = async (req, res) => {
    try {
        const { developer, year, sortBy, order } = req.query;
        let filter = {};
        let sort = {};

        if (developer) filter.developer = developer;
        if (year) filter.year = Number(year);

        if (sortBy) {
            sort[sortBy] = order === 'desc' ? -1 : 1;
        }

        const games = await gamesModel.find(filter).sort(sort);
        res.json(games);
    } catch(error){
        res.status(400).json({ error: error.message });
    }
};

// Create a new game
export const createGames = async (req, res) => {
    try{
        const game = new gamesModel(req.body);
        const newGame = await game.save();
        res.json(newGame);
    }catch(error){
        res.status(400).json({ error: error.message });
    }
};

// Update a game
export const updateGames = async (req, res) => {
    const gameId = req.params.id;
    const updates = req.body;
    try{
        const updatedGame = await gamesModel.findByIdAndUpdate(gameId, updates, { new: true });
        if (!updatedGame) {
            return res.status(404).json({ message: "Juego no encontrado" });            
        } 
        res.json(updatedGame);
    } catch (error) {
            res.status(400).json({ error: error.message });
        }
};

//Get game by ID
export const getGamesById = async (req, res) => {
    try {
      const game = await gamesModel.findById(req.params.id);
      if (!game) return res.status(404).json({ error: "Juego no encontrado" });
      res.json(game);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// Delete a game
export const deleteGames = async (req, res) => {
    const gameId = req.params.id;
    try {
        const deletedGame = await gamesModel.findByIdAndDelete(gameId);
        if (!deletedGame) {
            return res.status(404).json({ message: "Juego no encontrado" });
        }
        res.json({ message: "Juego eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};