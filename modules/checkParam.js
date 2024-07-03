const checkParam = (param, keys) => {
    let isValid = true; 

    for(const field of keys){
        if(!param[field] || param[field] === ''){
            isValid = false;
        }
    }

    return isValid;

}

module.exports = {checkParam}