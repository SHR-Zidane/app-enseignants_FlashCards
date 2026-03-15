import vine from '@vinejs/vine'
import { db } from '@adonisjs/lucid/services/db'

const deckValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).unique(async (db, value, field) => {
      const query = db.from('decks').where('title', value)

      if (field.data.id) {
        query.whereNot('id', field.data.id)
      }

      const deck = await query.first()

      return !deck
    }),
    description: vine.string().trim().minLength(10),
    categoryId: vine.number(),
  })
)

export { deckValidator }
