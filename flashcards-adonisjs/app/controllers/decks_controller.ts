import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import FlashCard from '#models/flash_card'
import { deckValidator } from '#validators/deck'
import Category from '#models/category'

export default class DecksController {
  public async index({ view }: HttpContext) {
    const decks = await Deck.query().preload('category').withCount('flashcards')

    return view.render('pages/home', { decks })
  }


  async show({ params, view }: HttpContext) {
    const deck = await Deck.query().where('id', params.id).preload('flashcards').firstOrFail()

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


  async addCard({ params, request, response }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    await deck.related('flashcards').create({
      question: request.input('question'),
      answer: request.input('answer'),
    })

    return response.redirect().back()
  }


  async create({ view }: HttpContext) {

    const categories = await Category.all()

    return view.render('pages/create', { categories })
  }


  async store({ request, response, session }: HttpContext) {
    const data = request.only(['title', 'description', 'categoryId'])

    await Deck.create(data)

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

  async destroy({ params, response, session }: HttpContext){
    const deck = await Deck.findOrFail(params.id)
    await deck.delete()
    session.flash('success', 'Le deck a bien été supprimé ')
    return response.redirect().toRoute('deck')
  }
}
