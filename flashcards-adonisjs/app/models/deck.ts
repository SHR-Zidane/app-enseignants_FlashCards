import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import FlashCard from './flash_card.js'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @hasMany(() => FlashCard, {
    foreignKey: 'deckId',
  })
  declare flashcards: HasMany<typeof FlashCard>
}
