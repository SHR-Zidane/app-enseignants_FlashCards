import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Deck from '#models/deck'
import Category from '#models/category'

export default class extends BaseSeeder {
  async run() {
    const category = await Category.firstOrCreate({ name: 'Géographie' })

    await Deck.createMany([
      {
        title: 'Capitales',
        description: 'Les capitales de tous les pays du monde',
        categoryId: category.id,
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
