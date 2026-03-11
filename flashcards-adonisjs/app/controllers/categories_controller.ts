import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'
import { categoryValidator } from '#validators/category'
export default class CategoriesController {
  public async index({ view }: HttpContext) {
    const categories = await Category.query()

    return view.render('pages/categories', { categories })
  }
  async create({ view }: HttpContext) {
    return view.render('pages/categories-create')
  }

  async store({ request, response, session }: HttpContext) {
    const data = request.only(['name'])
    const payload = await request.validateUsing(categoryValidator)

    await Category.create(data)
    session.flash('Success', 'Catégorie créée avec succès !')
    session.flashAll()

    return response.redirect().toRoute('category')
  }
}
