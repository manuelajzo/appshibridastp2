import express from "express"
import { 
    getAllGames, 
    createGames, 
    updateGames, 
    getGamesById,
    deleteGames,
} from "../controllers/gamesController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get('/', getAllGames)
router.get('/:id', getGamesById)

router.post('/', verifyToken, createGames)
router.put('/:id', verifyToken, updateGames)
router.delete('/:id', verifyToken, deleteGames)

export default router;
