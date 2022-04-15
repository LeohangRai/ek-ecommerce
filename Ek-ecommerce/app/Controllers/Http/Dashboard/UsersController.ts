import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Role from 'App/Models/Role'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('viewList')
    const users = await User.query().preload('role')
    return view.render('dashboard/users/index', { title: 'Users', users })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create')
    const roles = await Role.all()
    return view.render('dashboard/users/create', { roles, title: 'Create user' })
  }

  public async store({ request, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create')
    const payload = await request.validate(CreateUserValidator)

    try {
      const user = await User.create(payload)
      session.flash('success', `The user "${user.username}" has been created succesfully`)
      return response.redirect().toRoute('dashboard.users.index')
    } catch (e) {
      session.flash('error', e.message)
      return response.redirect('back')
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')
    const user = await User.findOrFail(params.id)
    const roles = await Role.all()
    return view.render('dashboard/users/edit', { title: `Edit user ${user.username}`, user, roles })
  }

  public async update({ params, request, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')
    const payload = await request.validate(UpdateUserValidator)

    try {
      const user = await User.updateOrCreate({ id: params.id }, { ...payload })
      session.flash('success', `The user "${user.username}" was updated succesfully.`)
      return response.redirect().toRoute('dashboard.users.index')
    } catch (e) {
      session.flash('error', e.message)
      return response.redirect('back')
    }
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('delete')
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      session.flash('success', `The user "${user.username}" was deleted succesfully`)
      response.redirect('back')
    } catch (e) {
      session.flash('error', e.message)
      response.redirect('back')
    }
  }
}
