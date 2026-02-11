// import type { HttpContext } from '@adonisjs/core/http'
import deck from '#models/deck'
export default class DecksController {
  public async index({ view }) {
    const decks = await deck.all()
    return view.render('home', { decks })
  }
}
