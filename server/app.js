require('dotenv').config()
const express = require('express');
const {init, login, refresh} = require('./spotify/login')
const app = express();
const port = 8888

const SpotifyWebApi = require('spotify-web-api-node');
let refresh_time = new Date();

const spotifyWebApi = new SpotifyWebApi({
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET
});

app.get('/login', async (req, res) => {
    login(spotifyWebApi).then(time =>{
        res.send({'refresh time': time});
        refresh_time = time;
    })
    .catch(err =>{
        if (err){
            res.sendStatus(401).send('Problem logging into Spotify');
        }
    })

    console.log(refresh_time);
});

app.get('/load', async (req, res) => {
    spotifyWebApi.getMyCurrentPlaybackState({})
  .then(function(data) {
    // Output items
    if (data.body && data.body.is_playing) {
      console.log("User is currently playing something!");
    } else {
      console.log("User is not playing anything, or doing so in private.");
    }
  }, function(err) {
    console.log('Something went wrong!', err);
  });
})



let server = app.listen(port, function () {
    let port = server.address().port
    
    console.log("Example app listening at http://localhost:%s", port)
})