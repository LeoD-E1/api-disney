import User from '../../models/users.models';

// Function to check a user by email
export const checkUser = async (email) => {
  return await User.findOne({
    attributes: ['email', 'password'],
    where: {
      email
    }
  })
}