import {insert, findAll, findOne, updateOne, deleteOne, deleteMany} from '../services/mongodb.service.js'
import { ObjectId } from 'mongodb'

const postModel = async (req, res, next) => {
    try {
        const {author, name, type, modelJSON, description} = req.body
        const data = Date();
        const model = await insert('models', {author, name, type, modelJSON, description, data})
        res.json(model)
    } catch(er) {
        const error = new Error(er)
        error.status = 500
        next(error)
    }
}

const findModels = async (req, res, next) => {
    try {
        const models = await findAll('models')
        res.json(models)
    } catch(er) {
        const error = new Error(er);
        error.status = 500
        next(error);
    }
}

const findModel = async (req, res, next) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            let comment = await findOne('models', req.params.id)
            res.json(comment)
        } else {
            const error = new Error('Not found');
            error.status = 400
            next(error);
        }
    } catch(er) {
        const error = new Error(er);
        error.status = 500
        next(error);
    }
}

const changeModel = async (req, res, next) => {
    try {
        const {author, name, type, modelJSON, description} = req.body
        if (ObjectId.isValid(req.params.id)) {
            const data = Date();
            res.json(await updateOne('models', {author, name, type, modelJSON, description, data}, req.params.id))
        } else {
            const error = new Error('Not found');
            error.status = 400
            next(error);
        }
    } catch(er) {
        const error = new Error(er);
        error.status = 500
        next(error);
    }
}

const deleteModel = async(req, res, next) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            const updateModel = await deleteOne('models', req.params.id)
            res.json(updateModel)
        } else {
            const error = new Error('Not found');
            error.status = 400
            next(error);
        }
    } catch(er) {
        const error = new Error(er);
        error.status = 500
        next(error);
    }
}

const deleteModels = async(req, res, next) => {
    try {
        await deleteMany('models')
    } catch(er) {
        const error = new Error(er);
        error.status = 500
        next(error);
    }
    res.json()
}

const error = (err, req, res, next) => {
    res.send(`status ${err.status}\n messange: ${err.message}`)
}

export default {postModel, 
    findModels, 
    findModel, 
    changeModel, 
    deleteModel, 
    deleteModels, 
    error}