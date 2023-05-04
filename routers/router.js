// import express from 'express'
import Router from 'express'
import controllerModel from '../controllers/model.db.js'
import controllerUser from '../controllers/user.db.js'

import {badRequest, checkAuthorization} from '../middlewares/middleware.js'

const router = Router()

//Users

router.post('/users',controllerUser.postUser)

router.delete('/users/:id', controllerUser.deleteUser)

// Для все
router.get('/models', controllerModel.findModels)

router.get('/models/:id', controllerModel.findModel)

//Нужна авторизация
router.post('/models', checkAuthorization, controllerModel.postModel)

router.put('/models/:id', checkAuthorization, controllerModel.changeModel)

router.delete('/models/:id', checkAuthorization, controllerModel.deleteModel) 

router.delete('/models', checkAuthorization, controllerModel.deleteModels) 

router.use(badRequest)

export default router
