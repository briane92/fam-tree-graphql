/**
 * Created by beggl on 11/30/2017.
 */
import jwt from 'jsonwebtoken'

const secret = 'thisisasecretdonttellanyone'


const generateJWT = (userId) => {
    return jwt.sign({}, secret, {
        subject: userId
    })
}

const verifyJWT = (token) => {
    let payload = null
    jwt.verify(token, secret, function (err, decoded) {
        if(decoded)
            payload = decoded
    })
    console.log("payload is " + payload)
    return payload
}

export {generateJWT, verifyJWT}