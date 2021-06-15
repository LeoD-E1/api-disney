import User from '../../models/users.models';

// Function to check a user by username
export const checkUsername = async (username) => {
  return await User.findOne({
    attributes: ['email', 'password', 'username'],
    where: {
      username
    }
  })
}