import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../../utils/response';

const createUser = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {user: userData} = req.body;
        const result = await UserServices.createUserInDB(userData);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'User created successfully',
            data: result,
          });
    } catch (error) {
        next(error)
    }
};
const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
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
      const result = await UserServices.getSingleUserFromDB(userId);
  
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User retrieved successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
};
const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { userId } = req.params;
      const {user} = req.body;
      const result = await UserServices.updateUserFromDB(userId, user);
  
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
const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { userId } = req.params;
      const result = await UserServices.deleteUserFromDB(userId);
  
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User deleted successfully',
        data: result,
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

}