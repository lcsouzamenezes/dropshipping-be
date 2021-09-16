interface ICreateUserTokenDTO {
  token: string;
  type: 'access_token' | 'refresh_token' | 'activation_token';
  expires_at: Date;
  user_id: string;
}

export { ICreateUserTokenDTO };
