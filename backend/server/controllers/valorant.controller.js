import dotenv from "dotenv";

dotenv.config();

export const oauth2_callback = async (req, res) => {
  const clientID = "904e7558-66be-4c49-b89d-1020aad6da43";
  const clientSecret = process.env.RSO_CLIENT_SECRET;
  const auth = `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString(
    "base64"
  )}`;

  const formData = new URLSearchParams();
  formData.append("grant_type", "authorization_code");
  formData.append("code", req.query.code);
  formData.append("redirect_uri", "https://craftfeed.fly.dev/oauth2-callback");

  try {
    const response = await fetch("https://auth.riotgames.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: auth,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    } else {
      const tokens = await response.json();
      const access_token = encodeURIComponent(tokens.access_token);
      return res.redirect(`/val/getPlayerUuid?access_token=${access_token}`);
    }
  } catch (error) {
    return res.redirect(`http://localhost:5173?error=${error.message}`);
  }
};

export const getPlayerUuid = async (req, res) => {
  try {
    const { access_token } = req.query;
    const ENDPOINT_URL = `https://americas.api.riotgames.com/riot/account/v1/accounts/me?api_key=${process.env.RIOT_API_RSO_KEY}`;

    const response = await fetch(ENDPOINT_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        //  TODO: Bearer access
        Authorization: access_token,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    } else {
      const userData = await response.json();
      return res.redirect(
        `http://localhost:5173?data=${JSON.stringify(userData)}`
      );
    }
  } catch (error) {
    return res.redirect(`http://localhost:5173?error=${error.message}`);
  }
};
