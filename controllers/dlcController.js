import { parse } from "dotenv";
import dlcModel from "../models/dlcModel.js";

// Get all DLCs
export const getAllDlc = async (req, res) => {
    try {
        const { category, game, name, sort, page = 1, limit = 5 } = req.query;
        console.log("Category:", category);
        console.log("Game:", game);
        console.log("Sort:", sort);
        console.log("Page:", page);
        console.log("Limit:", limit);

        const filter = {};
        if (category) {
            filter.category = category;
        }
        if (game) {
            filter.game = new RegExp(`^${game}$`, 'i');
        }
        if (name) {
            filter.name = new RegExp(name, 'i');
        }

        let sortObj = {};
        if (sort) {
            const [field, order] = sort.split('_');
            if (field && order) {
                sortObj[field] = order.toLowerCase() === 'desc' ? -1 : 1;
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const dlcs = await dlcModel
            .find(filter)
            .sort(sortObj)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await dlcModel.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);

        res.json({ dlcs, total, totalPages, currentPage: parseInt(page) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create a new DLC
export const createDlc = async (req, res) => {
    try{
        const dlc = new dlcModel(req.body);
        const newDlc = await dlc.save();
        res.json(newDlc);
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

// Create multiple DLCs
export const createMultipleDLCs = async (req, res) => {
    try {
      const dlcs = await dlcModel.insertMany(req.body);
      res.status(201).json(dlcs);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// Get by ID
export const getDlcById = async (req, res) => {
    try {
        const dlc = await dlcModel.findById(req.params.id);
    if(!dlc){
        return res.status(404).json({ message: "DLC no encontrado" });
    }
    res.json(dlc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update DLC
export const updateDlc = async (req, res) => {
    try {
        const updatedDlc = await dlcModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDlc) {
            return res.status(404).json({ message: "DLC no encontrado" });
        }
        res.json(updatedDlc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete DLC
export const deleteDlc = async (req, res) => {
    try {
        const deletedDlc = await dlcModel.findByIdAndDelete(req.params.id);
        if (!deletedDlc) {
            return res.status(404).json({ message: "DLC no encontrado" });
        }
        res.json({ message: "DLC eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
