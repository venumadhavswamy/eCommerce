//Returns object(like json) query
//Forms a query with given keyword by adding regex
exports.getSearchQuery = (keyword)=>{
    let query = {};
    if(!keyword){
        query = {};
    }
    else{
        query = {
            name:{//Search in name field
                $regex:keyword,
                $options:"i",
            }
        }
    }
    return query;
}


exports.getFilterQuery = (queryParams)=>{
    console.log(queryParams);//gt,lt,gte,lte are without $
    queryParams = JSON.stringify(queryParams);
    console.log(queryParams);
    //Replace gt,lt,gte,lte with $gt,$lt,$gte,$lte
    queryParams = queryParams.replace(/\b(gt|lt|gte|lte)\b/g,(val)=>{return ('$'+val);});
    console.log(queryParams);

}