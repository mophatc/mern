import Product from "../models/Product.model.js"

export const createProduct =async (req, res, next )=>{
try {
   const product = await Product.create(req.body) 
   return res.status(201).json(product)
} catch (error) {
    next(error)
}
}