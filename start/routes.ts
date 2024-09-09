/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const NotesController = () => import('#controllers/notes_controller')
const AuthController = () => import('#controllers/auth/auth_controller')
const TestsController = () => import('#controllers/tests_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/').render('pages/home')

router
  .group(() => {
    router.put('test', [TestsController, 'test']).as('test')
    router.post('login', [AuthController, 'login']).as('login')
    router.post('register', [AuthController, 'register']).as('register')
    router.post('email/verify', [AuthController, 'verifyEmail']).as('email.verify')
  })
  .prefix('api')
  .as('api')

router
  .group(() => {
    router.resource('notes', NotesController).apiOnly()
  })
  .prefix('api')
  .as('api')
  .use(middleware.auth())
