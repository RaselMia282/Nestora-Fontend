export interface GoogleLoginInput {
  idToken: string;
}

export interface GoogleLoginResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}