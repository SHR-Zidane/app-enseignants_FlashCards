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
    const payload = await request.validateUsing(categoryValidator)

    await Category.create(payload)
    session.flash('success', 'Catégorie créée avec succès !')

    return response.redirect().toRoute('category')
  }

  async edit({ params, view }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    return view.render('pages/categories-edit', { category })
  }

  async update({ params, request, response, session }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    const payload = await request.validateUsing(categoryValidator)

    category.merge(payload)
    await category.save()

    session.flash('success', 'Catégorie mise à jour !')
    return response.redirect().toRoute('category')
  }

  async destroy({ params, response, session }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.delete()

    session.flash('success', 'Catégorie supprimée avec succès.')
    return response.redirect().toRoute('category')
  }
}
