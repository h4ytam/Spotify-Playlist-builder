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
  localStorage.setItem("access_token", token.access_token);

  return token;
};
