const Product = require('../models/Product');

exports.getAllProducts = async (req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).json({
            success:true,
            products: products
        });
    }
    catch(err){
        res.status(400).json({success:false,message:"Bad request",error:err});
    }
}

//Create product access: Supplier(Admin)
exports.createProduct = async (req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(201).json({
            message:"Product created successfully",
            success:true,
            product: product
        });
    }
    catch(err){
        res.status(400).json({success:false,message:"Bad request",error:err});
    }
}

//Update product
//Access: Admin
exports.updateProduct = async (req,res)=>{
    const productID = req.params.id;
    try{
        const product = await Product.findByIdAndUpdate(productID,req.body);
        if(product){
            res.status(200).json({success:true,message:"Product updated successfully"});
        }
        else{
            res.status(404).json({success:false,message:"Product not found"});
        }
    }
    catch(err){
        res.status(400).json({success:false,message:"Bad request",error:err});
    }
}

exports.deleteProduct = async (req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        console.log("product",product);
        if(product){
            res.status(200).json({success:true,message:"Product deleted successfully"});
        }
        else{
            res.status(404).json({success:false,message:"Product not found"});
        }
    }
    catch(err){
        res.status(400).json({success:false,message:"Bad request",error:err});
    }
}

exports.getProductDetails = async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            res.status(200).json({success:true,product});
        }
        else{
            res.status(404).json({success:false,message:"Product not found"});
        }
    }
    catch(err){
        res.status(400).json({success:false,message:"Bad request",error:err});
    }
}