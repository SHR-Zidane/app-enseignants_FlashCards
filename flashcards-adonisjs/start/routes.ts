import DecksController from '#controllers/decks_controller'
import router from '@adonisjs/core/services/router'

router.get('/', [DecksController, 'index']).as('deck')

router
  .post('/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/login')
  })
  .as('logout')

router.get('/decks/:id/study', [DecksController, 'show']).as('decks.study')

router.get('/deck/:id/edit', [DecksController, 'edit']).as('deck.edit')

router.put('/deck/:id/update', [DecksController, 'update']).as('deck.update')
