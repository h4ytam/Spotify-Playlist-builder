import * as querystring from "querystring";
const CLIENT_ID = "8d86a869399d49bca58688155f0ee7ea";
const CLIENT_SECRET = "58715d0fbe40472cac187c83822244b4";
const redirect_uri = "http://localhost:3000";

export default (req, res) => {
  const userCode = req.query.user_code;

  try {
    const spotifyUrl = "https://accounts.spotify.com/api/token";
    const buff = Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString(
      "base64"
    );

    const getAccessToken = async () => {
      const response = await fetch(spotifyUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${buff}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({
          grant_type: "authorization_code",
          code: userCode,
          redirect_uri: redirect_uri,
        }),
      });

      const resJson = await response.json();

      return res.status(200).json(resJson);
    };

    return getAccessToken();
  } catch (error) {
    console.error(error);
    return null;
  }
};
