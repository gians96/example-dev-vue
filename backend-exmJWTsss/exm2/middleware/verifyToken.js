const jwt = require('jsonwebtoken')

module.exports = function auth(req,res,next){

    const bearerHeader = req.header('Authorization')
    const bearer = bearerHeader.split(' ')
        //get token from array
        const token = bearer[1]
    if(!token) return res.status(401).send({message:'Acceso denegado tok',tok: 'asd '+req.header('Authorization')})

    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        //req.userssss guarda valores que se definen en el token el array de datos
        req.userssss = verified;
         next()
    } catch (error) {
        res.status(400).send({permiso: false ,message:'Token invalido',tok: req.header('Authorization')})
    }

}