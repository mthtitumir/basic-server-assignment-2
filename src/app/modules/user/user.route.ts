import express from 'express';
import { UserControllers } from './user.controller';
const router = express.Router();

// POST / //create a new user
// GET /
// GET /:userId
// PUT /:userId
// DELETE /:userId
// PUT /:userId/orders
// GET /:userId/orders
// GET /:userId/orders/total-price
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser)
router.put('/:userId', UserControllers.updateUser)
router.delete('/:userId', UserControllers.deleteUser)
router.put('/:userId/orders', UserControllers.addUserOrder)
router.get('/:userId/orders', UserControllers.userAllOrders)
router.get('/:userId/orders/total-price', UserControllers.getUserTotalPrice)

export const UserRoutes = router;