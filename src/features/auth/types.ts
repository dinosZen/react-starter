export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyRequest {
  code: string;
}

export interface ValidateRequest {
  code: string;
}

export interface LoginResponse {
  message: string;
  data: {
    partial_token: string;
    secret: string;
    user: {
      email: string;
      type: string;
    };
  };
}

export interface VerifyResponse {
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

export interface ValidateResponse {
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
