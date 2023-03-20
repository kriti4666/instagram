const jwt = require("jsonwebtoken");

const authenticate = (async(req, res, next ) => {
    const {token} = req.headers;

    const decode = jwt.verify(token, process.env.SECRET);
    try {
        if(decode) {
            req.id = decode.id;
            next();
        }
        else{
            res.send("Please Login");
        }
    } catch (error) {
        return res.send(error.message);
    }
})

module.exports = authenticate;