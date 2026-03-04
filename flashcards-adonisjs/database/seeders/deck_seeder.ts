import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Deck from '#models/deck'

export default class extends BaseSeeder {
  async run() {
    await Deck.createMany([
      {
        title: 'Capitales',
        description: 'Les capitales de tous les pays du monde',
      },
      {
        title: 'Tableau périodique',
        description: 'Le tableau périodique de Mendeleïev',
      },
      {
        title: 'Wortschatz 12',
        description: 'Die Ferien',
      },
    ])
  }
}
