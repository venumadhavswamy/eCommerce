//Returns object(like json) query
//Forms a query with given keyword by adding regex
exports.getSearchQuery = (keyword)=>{
    let query = {};
    if(!keyword){
        query = {};
    }
    else{
        query = {
            //Search in name field
            name:{
                $regex:keyword,$options:"i",
            }
        }
    }
    return query;
}

exports.getFilterQuery = (query)=>{
    console.log(query);//gt,lt,gte,lte are without $
    query = JSON.stringify(query);
    //Replace gt,lt,gte,lte with $gt,$lt,$gte,$lte
    query = query.replace(/\b(gt|lt|gte|lte)\b/g,(val)=>{return ('$'+val);});
    query = JSON.parse(query);
    return query;
}