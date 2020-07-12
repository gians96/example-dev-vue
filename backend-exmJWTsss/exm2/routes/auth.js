const router = require('express').Router()
const UserO = require('../model/User')
const {registerValidation, loginValidation} = require('../middleware/formValidation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    //antes de registrar validar

    
    //registerValidation instancia de la clase validation que es llamado a una paq. @hapi/Joi 
    //para hacer validaciones de formularios entrantes al serv.
    //error es un de los paramaetros que se extrae cuando existe algun error determinado en el metodo
    //si es vacio seguira con la peticion , pero si tienen algun error nos mostrara en error.deta....
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send({message:error.details[0].message})

    //Verificar si el usuario esta registrado en la database con el email
    const emailExist = await UserO.findOne ({email:req.body.email})
    if(emailExist) return res.status(400).send({message:'El email ya existe en la BD'})

    //Vamos Hashear el password
        //salt recibe un valor de un hash repitido 10  veces
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password , salt)

    //req.body es todos los datos enviados por el metodo dado en este caso post

    const roles={
        admin:true,
        seller:false,
        driver:false,
        user:false
    }

    const user = new UserO({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        roles : roles
    })
    try {
        // savedUser
        const savedUser = await user.save()
        
        res.status(200).send({user: savedUser._id,message:`Welcome ${user.name}`});
        //devuelve todo el objeto
        // res.send(savedUser);

    } catch (error) {
        res.status(400).send(error);

    }
})

router.post('/login', async (req, res) => {
    //validar formulario de emial y password si estan escritos correctamente
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send({message:error.details[0].message})

    //si el email existe , el userL te devuelve el objeto encontrado de acuerdo al email , trae todo sus datos
    const userL = await UserO.findOne ({ email : req.body.email})
    if( !userL ) return res.status(400).send({ message : 'El email no existe' })
   
    //si la contraseña es correcta, el validPass te retorna un Boolean
    //bcrypt.compare Compara dos valores sin son iguales y true si coinciden
    const validPass = await bcrypt.compare( req.body.password , userL.password )
    if(!validPass) return res.status(400).send({ message : 'Contraseña invalida' })
    

    //crear y asignar un token
        //jwt.sign asignamos un array donde tendran nuestros datos en el primer parametros 
        //el segundo parametro es una palabra secreta para poder encriptar
        //el tercer parametro podemos pasar el tiempo de duracion que va a tener el token de esta manera
        //{expiresIn: '30s'} expira en 30 segundos 
        //60 * 60 * 24 un dia 24 horas
    const token = jwt.sign({_id: userL._id,name: userL.name ,email: userL.email,roles: userL.roles}, process.env.TOKEN_SECRET ,{expiresIn: 60 * 60 * 24})
    //
    res.header('auth-token',token).status(200).send({message: 'login', token})


    

})




module.exports = router