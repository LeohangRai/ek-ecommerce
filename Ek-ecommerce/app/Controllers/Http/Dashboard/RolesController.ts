import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import CreateRoleValidator from 'App/Validators/CreateRoleValidator'
import UpdateRoleValidator from 'App/Validators/UpdateRoleValidator'

export default class RolesController {
  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('viewList')

    const roles = await Role.all()

    return view.render('dashboard/roles/index', { title: 'Roles', roles })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('create')

    return view.render('dashboard/roles/create', { title: 'Create new role' })
  }

  public async store({ request, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('create')

    const payload = await request.validate(CreateRoleValidator)
    try {
      const role = await Role.create(payload)
      session.flash('success', `The role "${role.name}" has been created succesfully`)
      return response.redirect().toRoute('dashboard.roles.index')
    } catch (e) {
      session.flash('error', e.message)
      return response.redirect('back')
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, bouncer, params }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('update')
    const role = await Role.findOrFail(params.id)

    return view.render('dashboard/roles/edit', { title: `Edit role ${role.name}`, role })
  }

  public async update({ params, request, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('update')

    const payload = await request.validate(UpdateRoleValidator)

    try {
      const role = await Role.updateOrCreate({ id: params.id }, { ...payload })

      session.flash('success', `The role "${role.name}" was updated succesfully.`)

      return response.redirect().toRoute('dashboard.roles.index')
    } catch (e) {
      session.flash('error', e.message)
      return response.redirect('back')
    }
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('delete')
    try {
      const role = await Role.findOrFail(params.id)
      await role.delete()
      console.log('Role deleted: ', role)

      session.flash('success', `The role "${role.name}" was deleted succesfully.`)
      response.redirect('back')
    } catch (e) {
      session.flash('error', e.message)
      response.redirect('back')
    }
  }
}
