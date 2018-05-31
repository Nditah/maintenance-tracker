import crypto from 'crypto'
export const callback = callback || (() => {});    // ok

export const validateRequest = (input, req, res) => {
    const param = input;
    if(param === null || param === undefined || param ==="" ){
        return res.status(422).json({
            message: `Invalid request. The input ${param} is required`
        });
    }else{
        return param;
    }
}

// Returns email if valid, else respond with error
export const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validity= re.test(String(email).toLowerCase());
    if(validity){
        return email;
    }else{
        return res.status(422).json({
            message: `Invalid email ${email}. Please enter the correct value`
        });
    }    
}

export const hash = (password) => {
    const secret = 'abcdefg';
    return crypto.createHmac('sha1', secret).update(password).digest('hex');
  }
  