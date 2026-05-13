export interface registerType {
  email: string;
  name: string;
  password: string;
}

export interface loginType {
  email: string;
  password: string;
}

export interface loginResponseType {
  accessToken?: string;
  refreshToken?: string;
  id: string;
  email: string;
  name: string;
  created_at: string;
}
