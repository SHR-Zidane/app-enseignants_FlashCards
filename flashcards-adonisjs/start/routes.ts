import DecksController from '#controllers/decks_controller'
import Deck from '#models/deck'
import router from '@adonisjs/core/services/router'

router.get('/', [DecksController, 'index']).as('deck')

router
  .post('/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/login')
  })
  .as('logout')
router.get('/decks/:id/edit', [DecksController, 'edit']).as('deck.edit')

router.post('/decks/:id/cards', [DecksController, 'addCard']).as('deck.addCard')

router.get('/decks/:id/study', [DecksController, 'show']).as('deck.study')

router.put('/deck/:id/update', [DecksController, 'update']).as('deck.update')

router.get('/decks/create', [DecksController, 'create']).as('deck.create')

router.post('/decks', [DecksController, 'store']).as('deck.store')
