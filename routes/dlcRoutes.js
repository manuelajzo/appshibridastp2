import express from "express"
import { 
    getAllDlc, 
    createDlc, 
    createMultipleDLCs,
    getDlcById,
    updateDlc,
    deleteDlc
 } from "../controllers/dlcController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get('/', getAllDlc)
router.get('/:id', getDlcById)

router.post('/', verifyToken, createDlc)
router.post('/multiple', verifyToken, createMultipleDLCs)
router.put('/:id', verifyToken, updateDlc)
router.delete('/:id', verifyToken, deleteDlc)

export default router;