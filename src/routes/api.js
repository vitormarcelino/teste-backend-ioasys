import express from 'express'
import AdminController from '../controllers/adminController.js'
import AuthController from '../controllers/authController.js'
import UserController from '../controllers/userController.js'
import MovieController from '../controllers/movieController.js'
import isAdminMiddleware from '../middlewares/isAdmin'
import isUserMiddleware from '../middlewares/isUser'

var router = express.Router()

const authController = new AuthController()

/*
#### Admin Routes ####
*/
const adminController = new AdminController()
router.get('/admins', adminController.index)
router.post('/admin', adminController.store)
router.get('/admin/:id', adminController.show)
router.patch('/admin/:id', adminController.update)
router.delete('/admin/:id', adminController.destroy)
router.post('/admin/authenticate', authController.authAdmin)


/*
#### User Routes ####
*/
const userController = new UserController()
router.get('/users', userController.index)
router.post('/user', userController.store)
router.get('/user/:id', userController.show)
router.patch('/user/:id', userController.update)
router.delete('/user/:id', userController.destroy)
router.post('/user/authenticate', authController.authUser)

/*
#### Movie Routes ####
*/
const movieController = new MovieController()
router.get('/movies', movieController.index)
router.post('/movie', isAdminMiddleware, movieController.store)
router.get('/movie/:id', movieController.show)
router.patch('/movie/:id', isAdminMiddleware, movieController.update)
router.delete('/movie/:id', isAdminMiddleware, movieController.destroy)
router.post('/movie/:id/vote', isUserMiddleware, movieController.vote)

export default router