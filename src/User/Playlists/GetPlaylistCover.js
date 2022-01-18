import axios from 'axios';
import { getAuthToken } from "../UserConfig/getAuthToken";

export async function getPlaylistCover(playlist_id) {
    try {
        const accessToken = await getAuthToken();
        const api_url = `https://api.spotify.com/v1/playlists/${playlist_id}/images`;
        const response = await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch(err) {
        // console.log(err);
        // console.log('An error has occured getting playlist image');
        return null;
    }
}