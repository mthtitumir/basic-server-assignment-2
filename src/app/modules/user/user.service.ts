import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

const createUserInDB = async (userData: TUser) => {
  const newUser = await User.create(userData);
  return newUser;
};
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
  await User.isUserExists(id);
  const result = await User.findOne({ userId: id });
  return result;
};

const updateUserFromDB = async (id: number, updatedUserData: TUser) => {
  await User.isUserExists(id);
  const result = await User.updateOne({ userId: id }, updatedUserData);
  return result;
};

const deleteUserFromDB = async (id: number) => {
  await User.isUserExists(id);
  const result = await User.deleteOne({ userId: id });
  return result;
};

const addUserOrderIntoDB = async (id: number, orderData: TOrder) => {
  await User.isUserExists(id);
  const result = await User.findOneAndUpdate(
    { userId: id },
    { $push: { orders: orderData } },
  );
  return result;
};

const getUserAllOrdersFromDB = async (id: number) => {
  await User.isUserExists(id);
  const result = await User.aggregate([
    {
      $match: { userId: id },
    },
    {
      $project: {
        _id: 0,
        orders: 1,
      },
    },
  ]);
  return result;
};

const getUserTotalPriceFromDB = async (id: number) => {
  await User.isUserExists(id);
  const result = await User.aggregate([
    {
      $match: { userId: id },
    },
    {
      $project: {
        _id: 0,
        totalOrdersPrice: {
          $sum: "$orders.price",
        },
      },
    },
  ]);
  const totalOrdersPrice = result.length > 0 ? result[0].totalOrdersPrice : 0;

  return totalOrdersPrice;
};

export const UserServices = {
  createUserInDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  addUserOrderIntoDB,
  getUserAllOrdersFromDB,
  getUserTotalPriceFromDB
};
