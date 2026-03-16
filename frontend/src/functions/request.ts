interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

class Request {
  async get<T>(url: string): Promise<T> {
    const res = await fetch(url);
    const data: ApiResponse<T> = await res.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }

  async post<T>(url: string, body: any, formDataContent?: boolean): Promise<T> {
    const res = await fetch(url, {
      method: "POST",
      headers: formDataContent ? {} : { "Content-Type": "application/json" },
      credentials: "include",
      body: body,
    });
    const data: ApiResponse<T> = await res.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }

  async put<T>(url: string, body: any, formDataContent?: boolean): Promise<T> {
    const res = await fetch(url, {
      method: "PUT",
      headers: formDataContent ? {} : { "Content-Type": "application/json" },
      body: body,
    });
    const data: ApiResponse<T> = await res.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }

  async delete<T>(url: string, body?: any): Promise<T> {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data: ApiResponse<T> = await res.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }
}

const request = new Request();

export default request;
