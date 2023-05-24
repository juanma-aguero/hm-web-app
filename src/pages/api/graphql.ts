import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function products(req, res) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res);
  console.log("accessToken", accessToken);
  const response = await fetch(`${process.env.HM_API_CORE}/graphql`, {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const products = await response.json();
  console.log("products", products);
  res.status(200).json(products);
});
