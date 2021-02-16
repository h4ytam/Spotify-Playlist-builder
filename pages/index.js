import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getAuthorizationCode, getToken } from "../lib/auth/authCodes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Typography,
  Card,
  CardActions,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@material-ui/core";

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
  const card = {
    width: " 400px",
    height: "300px",
    marginTop: "20px",
  };
  const cardImg = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    height: "180px",
    marginTop: "12px",
  };
  const cardFlex = {
    display: "flex",
    flexWrap: "wrap",
    height: "400px",
    justifyContent: "space-between",
  };
  return (
    <Container>
      <Typography variant="h3" component="h2">
        Spotify PLaylist generator
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => getAuthorizationCode(router)}
      >
        Login
      </Button>
      <hr />
      <Button
        variant="contained"
        color="primary"
        onClick={() => getToken(router.query)}
      >
        Request a Token
      </Button>
      <Button variant="contained" color="primary" onClick={() => currently()}>
        Get Artits
      </Button>

      <div style={cardFlex}>
        {items.length
          ? items.map((artist) => {
              return (
                <Card style={card}>
                  <CardActionArea>
                    <CardMedia
                      style={cardImg}
                      component="img"
                      image={artist.image}
                      title={artist.id}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {artist.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })
          : null}
      </div>
    </Container>
  );
}
