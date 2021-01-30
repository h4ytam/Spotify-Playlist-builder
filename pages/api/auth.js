import * as querystring from "querystring";
const CLIENT_ID = "8d86a869399d49bca58688155f0ee7ea";

export default (req, res) => {
  try {
    const scope =
      "user-read-private user-read-email playlist-read-private playlist-read-collaborative user-read-currently-playing user-top-read playlist-modify-public playlist-modify-private";

    const spotifyUrl =
      "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: "http://localhost:3000",
        //state: state,
        scope: scope,
        show_dialog: false,
      });

    // Send back the redirect url provided by the code generated above.
    res.status(200).json({ url: spotifyUrl });
  } catch (error) {
    console.error(error);
    // Send back a 400 response to indicate a bad request
    res.status(400);
  }
};
