/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const NotesController = () => import('#controllers/notes_controller')
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

router.resource('notes', NotesController)
