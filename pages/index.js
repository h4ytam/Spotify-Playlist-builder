import Head from "next/head";
import styles from "../styles/Home.module.css";
// import { Link } from "@router";
import React, { useEffect } from "react";

export default function Home() {
  return (
    <div>
      <h1>Spotify PLaylist generator</h1>
      <a href="/api/auth">Login</a>
    </div>
  );
}
