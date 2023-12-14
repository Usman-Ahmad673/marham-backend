class ApiFeatures {
    constructor(query , querystr){
        this.query = query
        this.querystr = querystr
    }
    
    search(){
        const keyword = this.querystr.keyword ? {
            name:{
                $regex : this.querystr.keyword,
                $options : "i"
            }
        } : {}

        // console.log(keyword);
        this.query = this.query.find({...keyword})
        return this
    }

    filter(){
        const tempQuery = {...this.querystr}
        console.log(tempQuery);
        //Removing Some Fields for Category
        const removeFields = ["keyword" , "page" , "limit"]
        
        removeFields.forEach(key => delete tempQuery[key])
        
        
        // Filter for Price
        console.log(tempQuery);
        let querystr = JSON.stringify(tempQuery)
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)
        

        console.log(querystr);
        this.query = this.query.find(JSON.parse(querystr))
        // this.query = this.query.find(tempQuery)
        return this
    }

    pagination(resultPerPage){
        const currentPage = Number(this.querystr.page) || 1

        const skip = resultPerPage * (currentPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip)

        return this
    }
    
}


module.exports = ApiFeatures