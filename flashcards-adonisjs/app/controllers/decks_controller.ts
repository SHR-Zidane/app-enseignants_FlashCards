import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck' // Vérifie l'import de ton modèle

export default class DecksController {
  public async index({ view }: HttpContext) {
    const decks = await Deck.all()
    // On rend la page en passant les données
    return view.render('pages/home', { decks })
  }
}
