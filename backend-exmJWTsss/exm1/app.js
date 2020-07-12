const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: 'welcome to the API'
    })
})

app.post('/api/posts', verificarToken, (req, res) => {
    jwt.verify(req.token, 'textsecretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Posts created.. ',
                authData
            })
        }
    })
})

app.post('/api/login', (req, res) => {
    //mock user
    const user = {
        id: 23,
        username: 'gians',
        email: 'demsdsdsd@gmail.com',
        password: 'pasdasdasdass',
        morta: 'car'
    }
    console.log(user)
    jwt.sign({user}, 'textsecretkey',{expiresIn: '30s'}, (err, token) => {
        res.json({token})
    })
})

//Formato de token
//Authorization:  Bearer [acceso_token]

//verificar token mediante una funcion
 function verificarToken(req, res, next) {
    //get auth header value 
    const bearerHeader = req.headers['authorization']
    //verificar si el token es undefined

    if (typeof bearerHeader !== 'undefined') {
    //split at the space
        const bearer = bearerHeader.split(' ')
        //get token from array
        const bearerToken = bearer[1]
        //set the token
        req.token = bearerToken
        //next middleware
        next()
    } else {
        res.sendStatus(403);
    }
}



app.listen(3002, () => console.log('Server started on port 3002'))