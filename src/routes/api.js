import express from 'express'
import AdminController from '../controllers/adminController.js'
import UserController from '../controllers/userController.js'

var router = express.Router()

/*
#### Admin Routes ####
*/
const adminController = new AdminController()
router.get('/admin', adminController.index)
router.post('/admin', adminController.store)
router.get('/admin/:id', adminController.show)
router.patch('/admin/:id', adminController.update)
router.delete('/admin/:id', adminController.destroy)


/*
#### User Routes ####
*/
const userController = new UserController()
router.get('/user', userController.index)
router.post('/user', userController.store)
router.get('/user/:id', userController.show)
router.patch('/user/:id', userController.update)
router.delete('/user/:id', userController.destroy)


export default router