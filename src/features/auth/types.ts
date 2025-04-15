export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    access_token: string;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      name: string;
      role: string;
    };
  };
}
