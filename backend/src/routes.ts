import { Router } from 'express'
import RegisterController from './controller/resgisterController'
import TicketController from './controller/ticketController'
import LoginController from './controller/loginController'
import AuthController from './controller/authController'

const router = Router()

router.post('/register', RegisterController.create)
router.post('/login', LoginController.loginAuth)
router.post('/ticket', AuthController.auth, TicketController.create)
router.get('/ticket', AuthController.auth, TicketController.findall)
router.put('/ticket', AuthController.auth, TicketController.update)

export { router }
