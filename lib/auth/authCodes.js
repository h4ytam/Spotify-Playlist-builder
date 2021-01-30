import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export const getAuthorizationCode = async (router) => {
  const req = await fetch("/api/auth");
  const authResponse = await req.json();
  await router.replace(authResponse.url);
  return authResponse;
};

export const getToken = async (routerQuery) => {
  const userCode = routerQuery.code;
  const req = await fetch(`/api/getToken?user_code=${userCode}`);
  const token = await req.json();
  console.log(token);
  return token;
};
