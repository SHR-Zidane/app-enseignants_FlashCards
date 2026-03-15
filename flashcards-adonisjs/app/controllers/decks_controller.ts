import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import FlashCard from '#models/flash_card'
import { deckValidator } from '#validators/deck'
import Category from '#models/category'
import { flashcardValidator } from '#validators/flashcard'

export default class DecksController {
  public async index({ auth, view }: HttpContext) {
    const user = auth.user!

    await user.load('decks', (decksQuery) => {
      decksQuery.preload('category')
      decksQuery.withCount('flashcards')
    })
    return view.render('pages/home', { decks: user.decks })
  }


  async show({ params, view, auth }: HttpContext) {
    const deck = await Deck.query()
      .where('id', params.id)
      .where('userId', auth.user!.id)
      .preload('flashcards')
      .firstOrFail()

    return view.render('pages/study', { deck })
  }


  async edit({ params, view }: HttpContext) {
    const deck = await Deck.query()
      .where('id', params.id)
      .preload('flashcards')
      .preload('category')
      .firstOrFail()

    const categories = await Category.all()

    return view.render('pages/edit', { deck, categories})
  }


  async addCard({ params, request, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    const data = await request.validateUsing(flashcardValidator, {
      meta: { deckId: deck.id }
    })
    console.log("Données validées :", data)
    await deck.related('flashcards').create(data)

    session.flash('success', 'La flashcard a bien été crée')
    return response.redirect().back()
  }


  async create({ view }: HttpContext) {

    const categories = await Category.all()

    return view.render('pages/create', { categories })
  }


  async store({ request, response, session, auth }: HttpContext) {
    const data = await request.validateUsing(deckValidator)

    await auth.user!.related('decks').create(data)

    session.flash('success', 'Le deck a bien été crée')

    return response.redirect().toRoute('deck')
  }
  async update({ params, request, session, response }: HttpContext) {
    const { title, description, categoryId } = await request.validateUsing(deckValidator)

    const deck = await Deck.findOrFail(params.id)

    deck.merge({
      title,
      description,
      categoryId,
    })

    await deck.save()

    session.flash('success', 'Le deck a bien été modifié ')

    return response.redirect().toRoute('deck')
  }

  async destroy({ params, response, session, auth }: HttpContext){
    const deck = await Deck.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .firstOrFail()
    await deck.delete()
    session.flash('success', 'Le deck a bien été supprimé ')
    return response.redirect().toRoute('deck')
  }
}
