import { RequestHandler, Request, Response } from 'express';
import mssql from 'mssql'
import { sqlConfig } from '../config/config';
import { Cart } from '../models';

interface ExtendedRequest extends Request {
    body: {
        productId: string,
        userId: number,
        quantity: number
    },
    params: {
        userId: string
    }
}


// get all cart items
export const getAllCartItems:RequestHandler=async(req, res)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        const cartItems: Cart[] = await (await pool.request().execute('spDisplayAllFromCart')).recordset
        res.status(200).json(cartItems)
    } catch (error:any) {
        res.status(404).json(error.message)
    }
}

// get user cart: ie get by user id
export const getUserCart=async(req:ExtendedRequest, res:Response)=>{
    try {
        const id = req.params.userId
        const pool = await mssql.connect(sqlConfig)
        const cart = await (await pool.request()
        .input('uId', id)
        .execute('spGetCartByUserId')).recordset

        if(!cart){
            res.status(404).json({error:`No cart items for user with id of ${id}`})
        }
        return res.status(200).json(cart)
    } catch (error: any) {
        return res.status(500).json(error.message)
    }

}

//add or update cart quantity
export async function addToCart(req:Request, res:Response){
    try {
        const { productId, userId, quantity} = req.body
        const pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input('pId', productId)
        .input('uId', userId)
        .input('quantity', quantity)
        .execute('spAddToCart')

        return res.status(201).json({message: 'Product added to database'})

    } catch (error:any) {
        return res.status(404).json(error.message)
    }
}

// reduce/ decrement cart quantity

export const reduceCartQuantity=async(req:Request, res:Response)=>{
    try {
        const {productId, userId} = req.body
        const pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input('productId', productId)
        .input('userId', userId)
        .execute('spDecrementCartQuantity')

        return res.status(201).json({message:'redced quantity by 1'})
    } catch (error:any) {
        return res.status(404).json(error.message)
    }
}