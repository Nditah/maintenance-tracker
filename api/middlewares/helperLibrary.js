export const callback = callback || (() => {});    // ok

export const validateRequest = (input, req, res) => {
    const param = input;
    if(param === null || param === undefined || param ==="" ){
        return res.status(422).json({
            message: `Invalid request. The input ${param} is required`,
            data:null
        });
    }else{
        return param;
    }
}

// Returns true if email is valid
export const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const hash = (password) => {
    return crypto.createHash('sha1').update(password).digest('base64')
  }
  