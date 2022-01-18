// Local node express api to get predominant color from a playlist image
import Vibrant from 'node-vibrant';
import express from 'express';
const App = express(); // API representation with express initialization
const PORT = 8888;

App.use( express.json() );

App.listen(
    PORT,
    () => console.log(`App up on http://localhost:${PORT}`)
)

// req is incoming data
App.get('/cover_colors/vibrant/:playlist_image_id', (req, res) => {
    // console.log(req.params.playlist_id);
    if(typeof(req.params.playlist_image_id) != 'string') {
        res.send(null);
    }
    let imgLink = `https://i.scdn.co/image/${req.params.playlist_image_id}`;
    console.log(imgLink);
    getVibrantHex(imgLink).then((result) => res.status(200).send(result));
});

function getVibrantHex(playlist_image) {
    return new Promise((resolve, reject) => {
        Vibrant.from(playlist_image).getPalette((err, palette) => {
            // console.log(palette);
            if(err) resolve(null);
            else resolve(palette.Vibrant.getHex());
            /*
            else resolve({
                'Vibrant': palette.Vibrant.getHex(),
                'DarkVibrant': palette.DarkVibrant.getHex(),
                'LightVibrant': palette.LightVibrant.getHex(),
                'Muted': palette.Muted.getHex(),
                'DarkMuted': palette.DarkMuted.getHex(),
                'LightMuted': palette.LightMuted.getHex()
            });
            */
        });
    });
}