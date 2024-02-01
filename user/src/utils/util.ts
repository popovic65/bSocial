import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function comparePasswords(
  candidatePassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, hashedPassword);
}

export function toJSON(user: { [key: string]: any }): { [key: string]: any } {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
