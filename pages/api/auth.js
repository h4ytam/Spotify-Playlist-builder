const my_client_id = "8d86a869399d49bca58688155f0ee7ea";
const redirect_uri = "http://localhost:3000";

export default (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  let scopes = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      my_client_id +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent(redirect_uri)
  );
};

// export default (req, res) => {
//   res.statusCode = 200;
//   res.json({ name: "John Dosssse" });
// };
