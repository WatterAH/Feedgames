import request from "@/functions/request";

const SERVER = process.env.NEXT_PUBLIC_SERVER_HOST;

class ServiceRouter {
  private url = `${SERVER}/service`;

  async token(email: string) {
    return request.post(`${this.url}/token`, JSON.stringify({ email }));
  }

  async resetPassword(password: string, token: string) {
    return request.post(
      `${this.url}/resetPassword`,
      JSON.stringify({ password, token }),
    );
  }
}

const serviceRouter = new ServiceRouter();

export default serviceRouter;
