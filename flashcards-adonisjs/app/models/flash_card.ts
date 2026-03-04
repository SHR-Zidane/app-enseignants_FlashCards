import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Deck from './deck.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
export enum CardSide {
  QUESTION = 'question',
  ANSWER = 'answer',
}
export default class FlashCard extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare question: string

  @column()
  declare side: CardSide

  @column()
  declare answer: string

  @column({ columnName: 'deck_id' })
  declare deckId: number

  @belongsTo(() => Deck)
  declare deck: BelongsTo<typeof Deck>
}
