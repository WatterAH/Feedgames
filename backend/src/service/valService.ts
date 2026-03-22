class ValService {
  private readonly clientID = process.env.RSO_CLIENT_ID!;
  private readonly clientSecret = process.env.RSO_CLIENT_SECRET!;
  private readonly rsoUrl = "https://auth.riotgames.com";
  private readonly apiUrl = "https://americas.api.riotgames.com";

  auth(userId: string): string {
    const redirectUri = `${process.env.SERVER_URL}/oauth2-callback`;
    const searchParams = new URLSearchParams({
      client_id: this.clientID,
      response_type: "code",
      scope: "openid",
      state: userId,
    });

    return `${this.rsoUrl}/authorize?redirect_uri=${redirectUri}&${searchParams.toString()}`;
  }

  async exchange(code: string): Promise<string | null> {
    const auth = `Basic ${Buffer.from(
      `${this.clientID}:${this.clientSecret}`,
    ).toString("base64")}`;

    const searchParams = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SERVER_URL + "/oauth2-callback",
    });

    try {
      const res = await fetch(`${this.rsoUrl}/token`, {
        method: "POST",
        headers: {
          Authorization: auth,
        },
        body: searchParams,
      });

      if (!res.ok) return null;

      const tokens = await res.json();
      return tokens.access_token;
    } catch (error) {
      return null;
    }
  }

  async identify(accessToken: string): Promise<string | null> {
    try {
      const res = await fetch(`${this.apiUrl}/riot/account/v1/accounts/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) return null;

      const riotId = await res.json();
      return riotId;
    } catch (error) {
      return null;
    }
  }
}

export default ValService;
