import axios from "axios";
const baseUrl = "/api/videos";

const searchVideo = async (query) => {
    const response = await axios.get(`${baseUrl}/search/${query}`);
    return response.data;
};

export default { searchVideo };
