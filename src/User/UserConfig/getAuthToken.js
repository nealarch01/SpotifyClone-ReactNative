import ClientConfig from '../../../client_config.json';
import axios from 'axios';
import { Buffer } from 'buffer';
const qs = require('qs');

const clientID = ClientConfig.client_id;
const clientSecret = ClientConfig.client_secret;
const authToken = Buffer.from(`${clientID}:${clientSecret}`, 'utf-8').toString('base64');

export async function getAuthToken() {
    try {
        const data = qs.stringify({'grant_type':'client_credentials'});
        const response = await axios.post('https://accounts.spotify.com/api/token', data, {
            headers: {
                'Authorization': `Basic ${authToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        // console.log('Success getting auth token!');
        // console.log('Access token: ' + response.data.access_token);
        return response.data.access_token;
    } catch(err) {
        // console.log(err);
        console.log('There was an error obtaining the auth token: getAuthToken.js')
        return null;
    }
}