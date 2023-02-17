import { RequestHandler, Request, Response } from 'express';
import mssql from 'mssql'
import { sqlConfig } from '../config/config';
import { Cart, Orders } from '../models';

interface ExtendedRequest extends Request {
    body: {
        productId: string,
        userId: number,
        quantity: number
    },
    params: {
        orderId: string,
        userId:string
    }
}


// get all orders
export const getOrders:RequestHandler=async(req, res)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        const orders: Orders[] = await (await pool.request().execute('spDisplayAllFromOrders')).recordset
        res.status(200).json(orders)
    } catch (error:any) {
        res.status(404).json(error.message)
    }
}

// get order by order id
export const getOrderById=async(req:ExtendedRequest, res:Response)=>{
    try {
        const id = req.params.orderId
        const pool = await mssql.connect(sqlConfig)
        const order = await (await pool.request()
        .input('oId', id)
        .execute('spGetOrderById')).recordset[0]

        if(!order){
            res.status(404).json({error:`No order with an id of ${id}`})
        }
        return res.status(200).json(order)
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}

// get order by order id
export const getOrderByUserId=async(req:ExtendedRequest, res:Response)=>{
    try {
        const id = req.params.userId
        const pool = await mssql.connect(sqlConfig)
        const order = await (await pool.request()
        .input('uId', id)
        .execute('spGetOrderByUserId')).recordset[0]

        if(!order){
            res.status(404).json({error:`User id of ${id} has no orders`})
        }
        return res.status(200).json(order)
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}

//update order
export async function updateOrder(req:Request, res:Response){
    try {
        const { orderId, OrderStatus} = req.body
        const pool = await mssql.connect(sqlConfig)
        const order = await (await pool.request()
        .input('oId', orderId)
        .input('orderStatus', OrderStatus)
        .execute('spUpdateOrderStatus'))
        
        if(!order){
            res.status(404).json({error:`No such order`})
        }
        return res.status(200).json(order)
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}

//add from cart
export const addOrderFromCart=async(req:ExtendedRequest, res:Response)=>{
    try {
        const id = req.params.userId
        const pool = await mssql.connect(sqlConfig)
        const user = await (await pool.request()
        .input('uId', id)
        .execute('spAddFromCart'))

        if(user){
            return res.status(200).json({message:'order successful'})
        }
        res.status(404).json({error:`No cart items for user with id of ${id}`})

    } catch (error: any) {
        return res.status(500).json(error.message)
    }

}
