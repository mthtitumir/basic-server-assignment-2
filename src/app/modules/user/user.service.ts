import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserInDB = async ( userData: TUser) => {
    const newUser = await User.create(userData);
    return newUser;
}
const getAllUsersFromDB = async () => {
    const result = User.aggregate([
        {
          $project: {
            fullName: 1,
            username: 1,
            age: 1,
            email: 1,
            address: 1,
          },
        },
      ]);
    return result;
};
  
const getSingleUserFromDB = async (id: number) => {
    const result = await User.find({ userId: id });
    return result;
};

const updateUserFromDB = async (id: number, updatedUserData: TUser) => {
    const result = await User.updateOne({ userId: id }, updatedUserData);
    return result;
};

const deleteUserFromDB = async (id: number) => {
    const result = await User.deleteOne({ userId: id });
    return result;
};

export const UserServices = {
    createUserInDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB
}