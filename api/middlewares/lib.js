export const callback = callback || (() => {});    // ok

export const validate_req = (param, req, res) => {
    if(param === null || param === undefined ){
        return res.status(422).json({
            message: `Invalid request. The input ${param} is required`,
            data:null
        });
    }else{
        return param;
    }
}