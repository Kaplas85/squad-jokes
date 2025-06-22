import type { ExternalUser } from "@/types/auth";
import { generateToken } from "./auth";

const externalUsers: ExternalUser[] = [];

function addExternalUser({
  name,
  email,
  profile,
}: Pick<ExternalUser, "name" | "email"> & { profile: any }) {
  let user = externalUsers.find((u) => u.email === email);
  if (!user) {
    user = {
      id: profile.id,
      name,
      email,
      role: "user",
      federated: {
        provider: "google",
        profile: profile.id,
      },
    };
    externalUsers.push(user);
  }
  return user;
}

function getExternalUser(profileId: string) {
  const user = externalUsers.find((u) => u.federated.profile === profileId);

  if (!user) {
    return null;
  }

  const token = generateToken(user as ExternalUser);
  return token;
}

export { addExternalUser, getExternalUser };
