const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    product_id:{
        type: Schema.Types.ObjectId,
        //ref: 'Product',
        required: true
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewer:{
        type:String,
        required: true
    },
    review_data:{
        type: String
    },
    updated_date:{
        type: Date,
        default: Date.now
    },
    upvotes:{
        type: Number,
        min: 0,
        default: 0
    },
    downvotes:{
        type: Number,
        min:0,
        default:0
    }

});

module.exports = mongoose.model("review",reviewSchema);