import {  Router } from "express";
import { addOrderFromCart, getOrderById, getOrderByUserId, getOrders, updateOrder } from "../controllers/orderControllers";
import { Orders } from "../models";

const orderRoutes = Router()

orderRoutes.get('', getOrders)

orderRoutes.get('/:orderId', getOrderById)

orderRoutes.get('/user/:userId', getOrderByUserId)

orderRoutes.get('/userOrders/:userId', addOrderFromCart)

orderRoutes.post('', updateOrder)


export default orderRoutes