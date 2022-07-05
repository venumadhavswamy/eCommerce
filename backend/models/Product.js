const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxLength:[8,"Price cannot exceed 8 digits"]
    },
    num_of_reviews:{
        type: Number,
        default:0
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        set: ()=>{
            let avg_rating = 0;
            if(!isNaN(this.sum_of_reviews) && !isNaN(this.num_of_reviews)){
                avg_rating = this.sum_of_reviews/this.num_of_reviews;
            }
            return avg_rating;
        }
    },
    sum_of_reviews:{
        type: Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"],
    },
    quantity:{
        type:Number,
        required:[true,"Please enter quantity"],
        min:1
    },
    updated_on:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("product",productSchema);