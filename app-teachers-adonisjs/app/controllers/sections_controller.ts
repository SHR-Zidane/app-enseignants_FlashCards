import type { HttpContext } from '@adonisjs/core/http'
import Section from '#models/sections'

export default class SectionsController {
  async index({ view }: HttpContext) {
    const sections = await Section.query().orderBy('name', 'asc')
    return view.render('pages/home', { sections })
  }
}
