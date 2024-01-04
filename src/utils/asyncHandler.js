// creating a wrapper async higher order function, to use every where

/*Example for promises process*/
const asyncHandler = (requestHandler) => {//returning in promise format
    (req, res, next) => {
        //invoke Promise
        Promise
            .resolve(() => (req, res, next))
            .catch((err) => next(err))
    }
}

export { asyncHandler }

/* Example for try catch process
//async higher order function,            v - this is a higher order function
export const asyncHandler = (fn) => async (req, res, next) => {
    try {
        //executing the function that we took as a param
        await fn(req, res, next)
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}
*/