export const emptyThrowError = (params: any, message: string):any => {
    if (typeof params === "string" && params.length === 0) {
        throw new Error(message)
    } else if (typeof params === "number" && params === 0) {
        throw new Error(message)
    } else if (Array.isArray(params) && params.length === 0) {
        throw new Error(message)
    } else if (params === null || params === undefined) {
        throw new Error(message)
    } 
    
    return 
}

export const notEmptyThrowError = (params: any, message: string):any => {
    if (typeof params === "string" && params.length > 0) {
        throw new Error(message)
    } else if (typeof params === "number" && params > 0) {
        throw new Error(message)
    } else if (Array.isArray(params) && params.length > 0) {
        throw new Error(message)
    } else if (params !== null) {
        throw new Error(message)
    } else {

    }
    return 
}

export const trueThrowError = (params: any, message: string): any =>{
    if(params){
        throw new Error(message)
    }

    return 
}