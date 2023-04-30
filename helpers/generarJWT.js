import jwt from "jsonwebtoken";

const generarJWT = (id, nombre) => {
    return jwt.sign( {nombre, id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default generarJWT