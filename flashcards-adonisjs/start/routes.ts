import DecksController from '#controllers/decks_controller'
import router from '@adonisjs/core/services/router'

// Cette route est la bonne : elle passe par le contrôleur pour charger les decks
router.get('/', [DecksController, 'index']).as('deck')

// On retire la ligne router.on('/').render('pages/home') car elle fait doublon

router
  .post('/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/login')
  })
  .as('logout')
