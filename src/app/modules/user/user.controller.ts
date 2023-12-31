import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../../utils/response';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;    
    const result = await UserServices.createUserInDB(userData);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All users are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(Number(userId));

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = req.body;
    const result = await UserServices.updateUserFromDB(Number(userId), user);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(Number(userId));

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User deleted successfully',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
const addUserOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const { order } = req.body;
    const result = await UserServices.addUserOrderIntoDB(Number(userId), order);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
const userAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserAllOrdersFromDB(Number(userId));
    if (result.length === 0) {
      return;
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Orders fetched successfully',
      data: result[0],
    });
  } catch (err) {
    next(err);
  }
};
const getUserTotalPrice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserTotalPriceFromDB(Number(userId));
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Total price calculated successfully!',
      data: {totalPrice: result},
    });
  } catch (err) {
    next(err);
  }
};
export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addUserOrder,
  userAllOrders,
  getUserTotalPrice
};
