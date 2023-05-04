import {insert, findAll, updateOne, deleteOne, deleteMany, findOneByLogin} from '../services/mongodb.service.js'
import { ObjectId } from 'mongodb'

const postUser = async (req, res) => {
    try {
        console.log("C")
        const {login, password} = req.body
        // const mbUser = await db.collection('users').findOne({login: login})
        if (await findOneByLogin('users', login)) {
            return res.send("Другой логин, пожалуйста. ЗАНЯТО!")
        }
        const user = await insert('users', {login, password})
        res.json(user)
    } catch(er) {
        const error = new Error(er);
        next(error);
    }
}

const deleteUser = async(req, res) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            const updateUser = await deleteOne('users', req.params.id)
            res.json(updateUser)
        } else {
            res.status(404).send("Not Found")
        }
    } catch(er) {
        const error = new Error(er);
        next(error);
    }
}

const error = (err, req, res, next) => {
    console.log(err.message);
}

export default {postUser, deleteUser}