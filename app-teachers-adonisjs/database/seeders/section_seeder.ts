import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Section from '#models/sections'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Section.createMany([
      { id: 1, name: 'Informatique' },
      { id: 2, name: 'Electronique' },
      { id: 3, name: 'Automatique' },
      { id: 4, name: 'Bois' },
      { id: 5, name: 'Mécatronique' },
      { id: 6, name: 'Polymécanique' },
    ])
  }
}
