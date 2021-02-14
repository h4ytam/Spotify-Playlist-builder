import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getAuthorizationCode, getToken } from "../lib/auth/authCodes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Home() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const currently = async () => {
    const token = localStorage.getItem("access_token");
    // console.log(token);
    const data = await fetch(
      "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const { items } = await data.json();
    const artists = items.map((artist) => ({
      genres: artist.genres,
      image: artist.images[0].url,
      name: artist.name,
      popularity: artist.popularity,
      id: artist.id,
      url: artist.external_urls.spotify,
    }));

    setItems(artists);
    // console.log(items);
  };

  return (
    <div>
      <h1>Spotify PLaylist generator</h1>
      <button onClick={() => getAuthorizationCode(router)}>Login</button>
      <hr />
      <button onClick={() => getToken(router.query)}>Request a Token</button>
      <button onClick={() => currently()}>Get Artits</button>

      <div>
        {items.length
          ? items.map((artist) => {
              console.log(artist.name);
              return <h1>{artist.name}</h1>;
            })
          : null}
      </div>
    </div>
  );
}
