import axios from "axios";
const baseUrl = "/api/videos/";

const getAll = async () => {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
};

const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

const create = async (videoPost) => {
    const response = await axios.post(`${baseUrl}/`, videoPost);
    return response.data;
};

export default { getAll, getById, create };
