import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getAuthorizationCode, getToken } from "../lib/auth/authCodes";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <h1>Spotify PLaylist generator</h1>
      <button onClick={() => getAuthorizationCode(router)}>Login</button>
      <hr />
      <button onClick={() => getToken(router.query)}>Request a Token</button>
    </div>
  );
}
