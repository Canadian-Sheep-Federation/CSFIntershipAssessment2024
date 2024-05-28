config = require("../utils/config");
const Vimeo = require("vimeo").Vimeo;

class VimeoClient {
    constructor(id, secret, accessToken) {
        this.vimeoClient = new Vimeo(id, secret, accessToken);
    }

    requestAsync(options) {
        return new Promise((resolve, reject) => {
            this.vimeoClient.request(
                options,
                (error, body, status_code, headers) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(body);
                }
            );
        });
    }

    async searchVideo(query) {
        const encodedQuery = encodeURIComponent(query);
        try {
            const response = await this.requestAsync({
                method: "GET",
                path: `/videos?query=${encodedQuery}&fields=$uri,name,description,link,user.name,user.uri&page=1&per_page=20`,
            });
            return response.data;
        } catch (error) {
            console.error("Error retrieving vimeo video data: ", error.message);
        }
    }

    async searchUser(query) {
        const encodedQuery = encodeURIComponent(query);
        try {
            const response = await this.requestAsync({
                method: "GET",
                path: `/users?query=${encodedQuery}`,
            });
            return response.data;
        } catch (error) {
            console.error("Error retrieving vimeo user data: ", error.message);
        }
    }

    async searchSpecificUserShowcase(userId, query) {
        const encodedQuery = encodeURIComponent(query);
        try {
            const response = await this.requestAsync({
                method: "GET",
                path: `/users/${userId}/albums?query=${encodedQuery}`,
            });
            return response.data;
        } catch (error) {
            console.error("Error retrieving vimeo user data: ", error.message);
        }
    }

    async searchChannel(query) {
        const encodedQuery = encodeURIComponent(query);
        try {
            const response = await this.requestAsync({
                method: "GET",
                path: `/channels?query${encodedQuery}`,
            });
            return response.data;
        } catch (error) {
            console.error("Error retrieving vimeo user data: ", error.message);
        }
    }
}

module.exports = VimeoClient;
