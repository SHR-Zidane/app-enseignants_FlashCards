import type { HttpContext } from '@adonisjs/core/http'
import FlashCard from '#models/flash_card'

export default class FlashcardsController {
  async destroy({ params, response, session }: HttpContext) {
      const card = await FlashCard.findOrFail(params.id)
      await card.delete()
      session.flash('success', 'flashcard supprimée avec succès.')
      return response.redirect().toRoute('deck.edit')
    }
}
