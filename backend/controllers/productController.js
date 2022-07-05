const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorHandler');
const {catchAsyncError} = require('../middleware/catchAsyncErrors');
const productQueries = require('../utils/productQueries');

exports.getAllProducts = async (req,res,next)=>{
    catchAsyncError(async ()=>{
        const query = productQueries.getFilterQuery(req.query);
        //const query = productQueries.getSearchQuery(req.query.keyword);
        const productsPerPage = req.query.productsPerPage || 5;
        const skipCount = getSkipCount(req.query.pageNumber, productsPerPage);
        const totalProductsCount = await Product.count(query);
        const products = await Product.find(query).skip(skipCount).limit(productsPerPage);
        res.status(200).json({
            success:true,
            products: products,
            productsCount: totalProductsCount
        });
    },req,res,next);
}

function getSkipCount(pageNumber,productsPerPage){
    pageNumber = pageNumber || 1;
    return (pageNumber-1)*productsPerPage;
}

//Create product access: Supplier(Admin)
exports.createProduct = async (req,res,next)=>{
    try{
        const product = await Product.create(req.body);
        res.status(201).json({
            message:"Product created successfully",
            success:true,
            product: product
        });
    }
    catch(err){
        next(new ErrorHandler(err.message,400));
        //res.status(400).json({success:false,message:"Bad request",error:err});
    }
}

//Update product
//Access: Admin
exports.updateProduct = async (req,res,next)=>{
    const productID = req.params.id;
    try{
        const product = await Product.findByIdAndUpdate(productID,req.body);
        if(product){
            res.status(200).json({success:true,message:"Product updated successfully"});
        }
        else{
            next(new ErrorHandler("Product not found",404));
            //res.status(404).json({success:false,message:"Product not found"});
        }
    }
    catch(err){
        next(new ErrorHandler("Bad request",400));
        //res.status(400).json({success:false,message:"Bad request",error:err});
    }
}

exports.deleteProduct = async (req,res,next)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        console.log("product",product);
        if(product){
            res.status(200).json({success:true,message:"Product deleted successfully"});
        }
        else{
            next(new ErrorHandler("Product not found",404));
            //res.status(404).json({success:false,message:"Product not found"});
        }
    }
    catch(err){
        next(new ErrorHandler(err.message,400));
        //res.status(400).json({success:false,message:"Bad request",error:err});
    }
}

exports.getProductDetails = async (req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            res.status(200).json({success:true,product});
        }
        else{
            next(new ErrorHandler("Product not found",404));
            //res.status(404).json({success:false,message:"Product not found"});
        }
    }
    catch(err){
        next(new ErrorHandler(err.message,400));
        //res.status(400).json({success:false,message:"Bad request",error:err});
    }
}