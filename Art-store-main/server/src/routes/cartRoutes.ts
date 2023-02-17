import { Router } from "express";
import { addToCart, getAllCartItems, getUserCart, reduceCartQuantity } from "../controllers/cartController";

const cartRoutes = Router()


cartRoutes.get('', getAllCartItems)

cartRoutes.get('/:userId', getUserCart)

cartRoutes.post('', addToCart)

cartRoutes.put('', reduceCartQuantity)












export default cartRoutes