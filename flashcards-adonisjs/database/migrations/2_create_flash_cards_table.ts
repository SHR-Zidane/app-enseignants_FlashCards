import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'flash_cards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('question')
      table.string('answer')
      table.enum('side', ['question', 'answer']).defaultTo('question').notNullable()
      table.integer('deck_id').unsigned().references('id').inTable('decks').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
