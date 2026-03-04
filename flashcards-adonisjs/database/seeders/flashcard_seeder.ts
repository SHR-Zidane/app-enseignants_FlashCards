import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Deck from '#models/deck'
import FlashCard from '#models/flash_card'

export default class extends BaseSeeder {
  async run() {
    const deck = await Deck.firstOrCreate({ title: 'Wortschatz 12' }, { description: 'Die Ferien' })

    const vocabulary = [
      { question: 'Die Ferien (pl.)', answer: 'Les vacances' },
      { question: 'Der Urlaub', answer: 'Le congé / les vacances' },
      { question: 'Die Reise', answer: 'Le voyage' },
      { question: 'Der Strand', answer: 'La plage' },
      { question: 'Das Meer', answer: 'La mer' },
      { question: 'Der Koffer', answer: 'La valise' },
      { question: 'Packen', answer: 'Faire ses bagages' },
      { question: 'Die Fahrkarte', answer: 'Le billet (train/bus)' },
      { question: 'Der Reisepass', answer: 'Le passeport' },
      { question: 'Das Hotel', answer: "L'hôtel" },
      { question: 'Die Unterkunft', answer: "L'hébergement" },
      { question: 'Besichtigen', answer: 'Visiter (un monument)' },
      { question: 'Das Flugzeug', answer: "L'avion" },
      { question: 'Der Flughafen', answer: "L'aéroport" },
      { question: 'Der Bahnhof', answer: 'La gare' },
      { question: 'Ausland', answer: "L'étranger (pays)" },
      { question: 'Sich entspannen', answer: 'Se détendre' },
      { question: 'Wandern', answer: 'Faire de la randonnée' },
      { question: 'Die Postkarte', answer: 'La carte postale' },
      { question: 'Das Souvenir', answer: 'Le souvenir' },
      { question: 'Die Sonne', answer: 'Le soleil' },
      { question: 'Sonnenbaden', answer: 'Prendre un bain de soleil' },
      { question: 'Buchen / Reservieren', answer: 'Réserver' },
      { question: 'Der Aufenthalt', answer: 'Le séjour' },
      { question: 'Gute Reise!', answer: 'Bon voyage !' },
    ]

    for (const item of vocabulary) {
      await FlashCard.firstOrCreate(
        { question: item.question, deckId: deck.id },
        {
          question: item.question,
          answer: item.answer,
          deckId: deck.id,
        }
      )
    }
  }
}
