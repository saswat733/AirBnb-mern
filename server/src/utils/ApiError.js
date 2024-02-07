class ApiError extends Error{
    constructor(
        statuscode,
        message="something went wrong",
        error=[],
        stack="",
    ){
        super(message);
        this.message=message;
        this.data=null;
        this.statuscode=statuscode
        this.success=false
        this.errors=error

        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}