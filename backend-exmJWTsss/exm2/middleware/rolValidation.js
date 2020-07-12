const UserO = require('../model/User')
module.exports = function rolVerify(rolControl) {
    return async (req, res, next) => {
        try {
            const user = await UserO.findOne({
                _id: req.userssss._id
            })
            let bol= false
            rolControl.forEach(
                function (elemento, indice, array) {
                    if ('admin' === rolControl[indice]) {
                        if (user.roles.admin) {
                            bol=true
                        }
                    }
                    if ('user' === rolControl[indice]) {
                        if (user.roles.user) {
                            bol=true
                        }
                    }
                    if ('seller' === rolControl[indice]) {
                        if (user.roles.seller) {
                            bol=true
                        }
                    }
                    if ('driver' === rolControl[indice]) {
                        if (user.roles.driver) {
                            bol=true
                        }                    
                    }
                    
                });
                if(!bol) return res.status(400).send({permiso:false, message : 'Rol invalido' })
                next()

        } catch (error) {
            res.status(400).send({permiso: false,message: `Peticion no concluida e: ${error}`})
        }
    }
}