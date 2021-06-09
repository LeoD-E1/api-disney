import bcrypt from 'bcrypt';

// Function to hash a password
export const encodePassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword;
}