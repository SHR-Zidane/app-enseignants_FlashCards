import type { HttpContext } from '@adonisjs/core/http'
import FlashCard from '#models/flash_card'

export default class FlashcardsController {
  async destroy({ params, response, session }: HttpContext) {
      const card = await FlashCard.findOrFail(params.id)
      await card.delete()

      session.flash('success', 'flashcard supprimée avec succès.')
      return response.redirect().back()
    }

  async edit({ params, view }: HttpContext) {
    console.log("Contenu de params :", params)

    const card = await FlashCard.findByOrFail(params.id)
    return view.render('pages/flashcard-edit', { card })
  }

  async update({ params, request, response, session }: HttpContext) {
    const card = await FlashCard.findByOrFail(params.id)

    const data = request.only(['question', 'answer'])

    card.merge(data)
    await card.save()

    session.flash('success', 'La flashcard a bien été modifiée')

    return response.redirect().toRoute('deck.edit', { id: card.deckId })
  }
}
