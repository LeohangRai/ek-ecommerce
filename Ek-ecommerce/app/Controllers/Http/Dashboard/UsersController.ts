import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Role from 'Contracts/enums/Role'
import { createUser } from 'App/Account'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('viewList')

    const users = await User.all()
    return view.render('dashboard/users/index', { title: 'Users', users, Role })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create')

    let roles = {} as any
    for (let [key, value] of Object.entries(Role)) {
      if (typeof value === 'number') {
        roles[key] = { key: key, value: value }
      }
    }
    return view.render('dashboard/users/create', { roles, title: 'Create user' })
  }

  public async store({ request, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create')

    const createSchema = schema.create({
      username: schema.string({ trim: true }, [
        rules.required(),
        rules.unique({ table: 'users', column: 'username' }),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({
          table: 'users',
          column: 'email',
          caseInsensitive: true,
        }),
      ]),
      password: schema.string({}, [rules.minLength(8)]),
      phone: schema.string({}, [rules.unique({ table: 'users', column: 'phone' })]),
      roleId: schema.number(),
    })

    const createMessages = {
      'required': 'The {{ field }} is required for creating a new account',
      'email.unique': 'Email already in use',
      'username.unique': 'The username is already in use',
      'phone.unique': 'The phone number is already in use',
      'password.minLength': 'The password must contain at least 8 characters.',
    }

    const userDetails = await request.validate({
      schema: createSchema,
      messages: createMessages,
    })

    const user = await createUser(
      userDetails.username,
      userDetails.email,
      userDetails.password,
      userDetails.phone,
      userDetails.roleId
    )

    session.flash('success', `The user "${user.username}" has been created succesfully`)
    return response.redirect().toRoute('dashboard.users.index')
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')
    const user = await User.findOrFail(params.id)
    let roles = {} as any
    for (let [key, value] of Object.entries(Role)) {
      if (typeof value === 'number') {
        roles[key] = { key: key, value: value }
      }
    }

    return view.render('dashboard/users/edit', { title: `Edit user ${user.username}`, user, roles })
  }

  public async update({ params, request, response, bouncer, session }: HttpContextContract) {
    // const user = await User.query().where('id', params.id)
    await bouncer.with('UserPolicy').authorize('update')

    const refs = schema.refs({
      id: params.id,
    })

    const updateSchema = schema.create({
      username: schema.string({ trim: true }, [
        rules.required(),
        rules.unique({ table: 'users', column: 'username', whereNot: { id: refs.id.value } }),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({
          table: 'users',
          column: 'email',
          caseInsensitive: true,
          whereNot: { id: refs.id.value },
        }),
      ]),
      password: schema.string({}, [rules.minLength(8)]),
      phone: schema.string({}, [
        rules.unique({ table: 'users', column: 'phone', whereNot: { id: refs.id.value } }),
      ]),
      role_id: schema.number(),
    })

    const updateMessages = {
      'required': 'The {{ field }} is required for creating a new account',
      'email.unique': 'Email already in use',
      'username.unique': 'The username is already in use',
      'phone.unique': 'The phone number is already in use',
      'password.minLength': 'The password must contain at least 8 characters.',
    }

    const userDetails = await request.validate({
      schema: updateSchema,
      messages: updateMessages,
    })
    try {
      const user = await User.findOrFail(params.id)
      await User.query().where('id', params.id).update(userDetails)

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
      console.log('User deleted: ', user)

      session.flash('success', `The user "${user.username}" was deleted succesfully`)
      response.redirect('back')
    } catch (e) {
      session.flash('error', e.message)
      response.redirect('back')
    }
  }
}
