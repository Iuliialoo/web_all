import {findOneByLoginAndPassword} from '../services/mongodb.service.js'

async function checkAuthorization(req, res, next){
    console.log('authorization')
    const login = req.query.login;
    const password = req.query.password;
    if (!await findOneByLoginAndPassword('users', login, password)) {
        res.status(400).send('Unauthorized')
    } else {
        next();
    }
}

function badRequest(req, res) {
    res.status(400).send('Bad Request');
}

export {checkAuthorization, badRequest}