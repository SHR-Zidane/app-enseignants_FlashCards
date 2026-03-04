import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import { deckValidator } from '#validators/deck'

export default class DecksController {
  public async index({ view }: HttpContext) {
    const decks = await Deck.query().withCount('flashcards')

    return view.render('pages/home', { decks })
  }
  async show({ params, view }: HttpContext) {
    const deck = await Deck.query().where('id', params.id).preload('flashcards').firstOrFail()

    return view.render('pages/study', { deck })
  }
  async edit({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    return view.render('pages/editdeck.edge', {
      title: 'Modifier deck',
      deck,
    })
  }

  async update({ params, request, session, response }: HttpContext) {
    const { title, description, id } = await request.validateUsing(deckValidator)

    const deck = await Deck.findOrFail(params.id)

    deck.merge({
      title,
      description,
      id,
    })

    const deckUpdated = await deck.save()

    session.flash('success', 'Le deck ${deckUpdated.title} a bien été modifié ')

    return response.redirect().toRoute('home')
  }
}
