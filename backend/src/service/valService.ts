class ValService {
  private readonly clientID = process.env.RSO_CLIENT_ID!;
  //   private readonly clientSecret = process.env.RSO_CLIENT_SECRET!;
  private readonly baseUrl = "https://auth.riotgames.com";

  auth(userId: string): string {
    const redirectURI = process.env.SERVER_URL + "/oauth2-callback";
    const searchParams = new URLSearchParams({
      redirect_uri: redirectURI,
      client_id: this.clientID,
      response_type: "code",
      scope: "openid",
      state: userId,
    });

    return `${this.baseUrl}/authorize?${searchParams.toString()}`;
  }
}

export default ValService;
