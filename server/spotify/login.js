async function login(spotifyWebApi) {
    // Retrieve an access token
    return await spotifyWebApi.clientCredentialsGrant().then(
        function (data) {
            let expiry_time = data.body['expires_in'];
            console.log('The access token expires in ' + expiry_time);
            console.log('The access token is ' + data.body['access_token']);

            // Save the access token so that it's used in future calls
            spotifyWebApi.setAccessToken(data.body['access_token']);
            let refresh_time = new Date();
            refresh_time.setSeconds(refresh_time.getSeconds() + expiry_time);
            return refresh_time;
        },
        function (err) {
            console.log(
                'Something went wrong when retrieving an access token',
                err.message
            );
        }
    );
}

async function refresh(spotifyWebApi, refresh_time) {
    return await SpotifyWebApi.refreshAccessToken()
        .then(
            function (data) {
                let expiry_time = data.body['expires_in'];
                console.log('The access token expires in ' + expiry_time);
                console.log('The access token is ' + data.body['access_token']);

                let refresh_time = new Date();
                refresh_time.setSeconds(refresh_time.getSeconds() + expiry_time);
                return refresh_time
            })
        .catch(
            function (err) {
                console.log('Cannot refresh token');
            })
}


module.exports = {
    login: login,
    refresh: refresh
}