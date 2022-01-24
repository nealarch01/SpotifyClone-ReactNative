import axios from "axios";
import { getAuthToken } from "../UserConfig/getAuthToken";

export async function getPlaylistTracks(playlist_id, fields) {
    try {
        const authToken = await getAuthToken();
        const api_url = `https://api.spotify.com/v1/playlists/${playlist_id}?market=ES&fields=${fields}` // end point url for playlists tracks
        const response = await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });
        // console.log(JSON.stringify(response.data, null, 4));
        // return JSON.stringify(response.data, null, 4);
        return response.data;
    } catch (err) {
        console.log(err);
        console.log('An error has occured. Cannot retrieve playlist tracks');
        return null;
    }
}