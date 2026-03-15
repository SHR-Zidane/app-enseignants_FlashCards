import DecksController from '#controllers/decks_controller'
import Deck from '#models/deck'
import router from '@adonisjs/core/services/router'
import CategoriesController from '#controllers/categories_controller'
import { create } from 'domain'
import FlashcardsController from '#controllers/flashcards_controller'
import AuthController from '#controllers/auth_controller'
import { middleware } from './kernel.js'

router.get('/', async ({ view }) => view.render('pages/auth/login')).as('auth.login')
router.get('/register', async ({ view }) => view.render('pages/auth/register')).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login.post')
router.post('/register', [AuthController, 'register']).as('auth.register.post')
router.post('/logout', [AuthController, 'logout']).as('auth.logout')


router.group(() => {

  // Decks
  router.get('/home', [DecksController, 'index']).as('deck')
  router.get('/decks/create', [DecksController, 'create']).as('deck.create')
  router.post('/decks', [DecksController, 'store']).as('deck.store')

  router.group(() => {
    router.get('/:id/study', [DecksController, 'show']).as('deck.study')
    router.get('/:id/edit', [DecksController, 'edit']).as('deck.edit')
    router.post('/:id/update', [DecksController, 'update']).as('deck.update')
    router.post('/:id/delete', [DecksController, 'destroy']).as('deck.destroy')
    router.post('/:id/cards', [DecksController, 'addCard']).as('deck.addCard')
  }).prefix('/decks')

  // Categories
  router.group(() => {
    router.get('/', [CategoriesController, 'index']).as('category')
    router.get('/create', [CategoriesController, 'create']).as('category.create')
    router.post('/', [CategoriesController, 'store']).as('category.store')
    router.get('/:id/edit', [CategoriesController, 'edit']).as('category.edit')
    router.post('/:id/update', [CategoriesController, 'update']).as('category.update')
    router.post('/:id/delete', [CategoriesController, 'destroy']).as('category.destroy')
  }).prefix('/categories')

  // Flashcards
  router.group(() => {
    router.get('/:id/edit', [FlashcardsController, 'edit']).as('card.edit')
    router.post('/:id', [FlashcardsController, 'update']).as('card.update')
    router.post('/:id/delete', [FlashcardsController, 'destroy']).as('card.destroy')
  }).prefix('/cards')

}).use(middleware.auth({ guards: ['web'] }))
