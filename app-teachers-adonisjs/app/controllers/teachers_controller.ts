import Teacher from '#models/teachers'
import Section from '#models/sections'
import { HttpContext } from '@adonisjs/core/http'
import { title } from 'process'
import { teacherValidator } from '#validators/teacher'

export default class TeachersController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const teachers = await Teacher.query().orderBy('lastname', 'asc').orderBy('firstname', 'asc')
    return view.render('pages/home', { teachers })
  }
  async show({ params, view }: HttpContext) {
    const teacher = await Teacher.query().where('id', params.id).preload('section').firstOrFail()

    return view.render('pages/teachers/show.edge', { title: "Détail d'un enseignant", teacher })
  }
  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const sections = await Section.query().orderBy('name', 'asc')

    return view.render('pages/teachers/create', { title: "Ajout d'un enseignant", sections })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {
    const { gender, firstname, lastname, nickname, origine, sectionId } =
      await request.validateUsing(teacherValidator)

    const teacher = await Teacher.create({
      gender,
      firstname,
      lastname,
      nickname,
      origine,
      sectionId,
    })
    // Afficher un message à l'utilisateur
    session.flash(
      'success',
      `Le nouvel enseignant ${teacher.lastname}
      ${teacher.firstname} a été ajouté avec succès !`
    )
    // Rediriger vers la homepage
    return response.redirect().toRoute('home')
  }
  async delete({ params, session, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)

    await teacher.delete()

    session.flash(
      'success',
      "L'enseignant ${teacher.lastname} ${teacher.firstname} a été supprimé avec succès !"
    )
    return response.redirect().toRoute('home')
  }
}
