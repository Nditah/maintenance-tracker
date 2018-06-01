import crypto from 'crypto'

export const callback = callback || (() => {});    // ok

export const validateString = (param, res) => {
    if(param === null || param === undefined || param.length === 0 ){
        return res.status(422).json({
            message: `Invalid request. The input ${param} is required`
        });
    }else{
        return param;
    }
}

export const validateNumber = (input, res) => {
    const validity = /^\+?(0|[1-9]\d*)$/.test(input);
    if(validity){
        return parseInt(input);
    }else{
        return res.status(422).json({
            message: `Invalid email ${input}. Please enter the correct value`
        });
    } 
}

// Returns email if valid, else respond with error
export const validateEmail = (input, res)  => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validity= re.test(String(input).toLowerCase());
    if(validity){
        return input;
    }else{
        return res.status(422).json({
            message: `Invalid email ${input}. Please enter the correct value`
        });
    }    
}

export const hash = (password) => {
    const secret = process.env.SECRET;
    return crypto.createHmac('sha1', secret).update(password).digest('hex');
  }
  