import axios from 'axios';

// Local endpoint link: http://localhost:8888/cover_colors/vibrant
export async function getVibrantColors(playlistID_link) {
    // https://i.scdn.co/image/ab67706f00000002bd0e19e810bb4b55ab164a95
    // https://i.scdn.co/image/ab67616d0000b2735b6c2018f91357bbf9d79e1e
    if(typeof(playlistID_link) != 'string') return '#191414';
    let imageID = '';
    let startingIndex = await findStartingIndex(playlistID_link);
    if(startingIndex === -1 || startingIndex >= playlistID_link.length) return '#191414';
    else {
        // '/' is already included in the imageID
        for(let i = startingIndex; i < playlistID_link.length; i++) {
            imageID += playlistID_link[i];
        }
    }  
    try {
        const api_url = 'http://localhost:8888/cover_colors/vibrant';
        const response = await axios.get(`${api_url}${imageID}`);
        return response.data;
    } catch(err) {
        console.log('There was an error obtaining vibrant color')
        return '#191414';
    }
}

async function findStartingIndex(playlistID_link) {
    let word = '';  
    let idx = 0;
    let toFind = 'image';
    for(let i = 0; i < playlistID_link.length; i++) {
        if(playlistID_link[i] !== toFind[idx]) {
            word = '';
            idx = 0;
        } else {
            word += playlistID_link[i];
            idx++;
        }
        if(word === toFind) return i + 1;
    }
    return -1; // not found
}