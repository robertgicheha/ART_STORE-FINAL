import { RequestHandler, Request, Response } from 'express'
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import { sqlConfig } from '../config/config'
import { Products } from '../models'

interface ExtendedRequest extends Request {
    body: {
        id:string,
        Name:string,
        Description: string,
        Category: string,
        ImageUrl:string,
        Price: number 
    },
    params: {
        id:string
    }
}


// get all products
export const getAllProducts: RequestHandler= async (req, res)=> {

    try {
        const pool = await mssql.connect(sqlConfig)
        const products: Products[] = await (await pool.request().execute('spGetAllProducts')).recordset
        res.status(200).json(products)
    } catch (error:any) {
        res.status(404).json(error.message)
    }

}


// get single products
export const getSingleProduct=async(req:ExtendedRequest, res: Response)=>{
    try {
        const id = req.params.id
        const pool = await mssql.connect(sqlConfig)

        const product = await( await pool.request()
        .input('id', id)
        .execute('spGetSingleProduct')
        ).recordset[0]

        if(!product){
            res.status(404).json({error: 'Product not found'})
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}


// add a product
export async function addProduct(req:ExtendedRequest, res: Response) {
    try {
        const id = uid()
        const { Name, Description, Category, ImageUrl, Price} = req.body
        const pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input('id',id)
        .input('name',Name)
        .input('description',Description)
        .input('category',Category)
        .input('price',Price)
        .input('imageUrl',ImageUrl)
        .execute('spAddOrUpdateProduct')
    
        res.status(201).json({message: 'Product added to database'})
    } 
    catch (error:any) {
        res.status(404).json(error.message)
    }
}


// update a product 
export async function updateProduct(req:ExtendedRequest, res:Response){
    try {
        const { Name, Description, Category, ImageUrl, Price} = req.body
        const pool = await mssql.connect(sqlConfig)
        const product:Products[] = await(await pool.request()
        .input('id',req.params.id)
        .execute('spGetSingleProduct')
        ).recordset[0]

        if(product) {
            await pool.request()
            .input('id',req.params.id)
            .input('name',Name)
            .input('description',Description)
            .input('category',Category)
            .input('price',Price)
            .input('imageUrl',ImageUrl)
            .execute('spAddOrUpdateProduct')
            return res.status(200).json({message:'Resource updated successfully'})
        }
        return res.status(404).json({error:'Product Not Found'})
    } 
    catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// delete a product from the datatbsase

export const deleteProduct=async(req:ExtendedRequest, res:Response)=>{
    try {

        const pool = await mssql.connect(sqlConfig)

        const product:Products[] = await(await pool.request()
        .input('id',req.params.id)
        .execute('spGetSingleProduct')
        ).recordset[0]

        if(product){    
        await pool.request().input('id',req.params.id).execute('spDeleteProduct')
        return res.status(200).json({message:'Deleted'})
        }
        return res.status(404).json({error:'Can\'t Delete, Product Not Found'})
        
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}