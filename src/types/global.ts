import type { LocalUser } from "./auth";

declare global {
  namespace Express {
    interface User extends LocalUser {
      federated?: any; // Adjust the type as needed for federated user data
    }
  }
}
