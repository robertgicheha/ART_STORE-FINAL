import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productControllers";

const productsRouter = Router()

productsRouter.get('', getAllProducts)

productsRouter.get('/:id', getSingleProduct)

productsRouter.put('/:id', updateProduct)

productsRouter.post('', addProduct)

productsRouter.delete('/:id', deleteProduct)

export default productsRouter