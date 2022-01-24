import { getAuthToken } from "../UserConfig/getAuthToken";
import axios from 'axios';

export async function getCategoryPlaylists(category_id) {
    const authToken = await getAuthToken();
    const api_url = `https://api.spotify.com/v1/browse/categories/${category_id}/playlists?country=US`;
    try {
        const response = await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
        console.log('There was an error getting category playlists');
        return null;
    }
}