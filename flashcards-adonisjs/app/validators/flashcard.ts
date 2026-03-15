import vine from '@vinejs/vine'
import { db } from '@adonisjs/lucid/services/db'

export const flashcardValidator = vine.compile(
  vine.object({
    question: vine.string().trim().minLength(10).unique(async (db, value, field) => {

      const query = db
        .from('flash_cards')
        .where('question', value)
        .where('deck_id', field.meta.deckId)

      if (field.meta.cardId) {
        query.whereNot('id', field.meta.cardId)
      }

      const duplicate = await query.first()
      return !duplicate
    }),

    answer: vine.string().trim().minLength(1),
    deckId: vine.number().optional(),
  })
)
