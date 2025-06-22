export type Role = "admin" | "user";

export interface ExternalUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  federated: {
    provider: string;
    profile: string;
  };
}

export interface LocalUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}
