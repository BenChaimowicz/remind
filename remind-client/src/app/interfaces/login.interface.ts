
export interface Login {
  email: string;
  password: string;
  remember: boolean;
}

export interface Token {
  email: string;
  userName: string;
  token: string;
}
