import { getAuthToken } from "../UserConfig/getAuthToken";
import axios from 'axios';

// This function will return an array of limit of browsing categories
export async function getCategoryData_US(limit) {
    try {
        if(typeof(limit) != 'number') {
            throw('Error: Limit must be an non-negative integer, type of formal parameter received is: ' + typeof(limit));
        }
        const authToken = await getAuthToken();
        const api_url = `https://api.spotify.com/v1/browse/categories?country=US&offset=0&limit=${limit}`;
        const response = await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
        console.log('There was an error getting category data');
        return null;
    }
}