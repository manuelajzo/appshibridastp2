import axios from "axios";

const api = `http://localhost:3000/api`;

export const getGames = async () => {
    try {
        let url = `${api}/games`;
        const response = await axios.get(url);

        return response.data;
    }catch (error) {
        console.error("Error fetching games:", error);
        throw error;
    }
}

export const getDLCs = async (page = 1, limit = 5) => {
    try {
        let url = `${api}/dlcs?page=${page}&limit=${limit}`;
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error("Error fetching DLCs:", error);
        throw error;
    }
}

export const createGame = async (game) => {
    const response = await axios.post(`${api}/games`, game);
    return response.data;
}

export const createDLC = async (dlc) => {
    const response = await axios.post(`${api}/dlcs`, dlc);
    return response.data;
}

export const deleteGame = async (id) => {
    const response = await axios.delete(`${api}/games/${id}`);
    return response.data;
}

export const deleteDLC = async (id) => {
    const response = await axios.delete(`${api}/dlcs/${id}`);
    return response.data;
}   

export const updateGame = async (id, game) => {
    const response = await axios.put(`${api}/games/${id}`, game);
    return response.data;
}

export const updateDLC = async (id, dlc) => {
    const response = await axios.put(`${api}/dlcs/${id}`, dlc);
    return response.data;
}
export const getGameById = async (id) => {
    try {
        const response = await axios.get(`${api}/games/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching game by ID:", error);
        throw error;
    }
}

export const getDLCById = async (id) => {  
    try {
        const response = await axios.get(`${api}/dlcs/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching DLC by ID:", error);
        throw error;
    }
}

export const getDLCsByGameId = async (gameId) => {
    try {
        const response = await axios.get(`${api}/dlcs?game=${gameId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching DLCs by game ID:", error);
        throw error;
    }
}

