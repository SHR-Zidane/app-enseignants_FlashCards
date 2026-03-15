import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import FlashCard from './flash_card.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from './category.js'
import User from '#models/user'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column({ columnName: 'category_id' })
  declare categoryId: number

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @hasMany(() => FlashCard, {
    foreignKey: 'deckId',
  })
  declare flashcards: HasMany<typeof FlashCard>
}
