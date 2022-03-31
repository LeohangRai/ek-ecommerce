import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async loginShow({ view }: HttpContextContract) {
    return view.render('auth/loginShow', { title: 'Login' })
  }

  public async login({}: HttpContextContract) {}

  public async index({}: HttpContextContract) {}

  public async create({ view }: HttpContextContract) {
    return view.render('auth/create', { title: 'Register' })
  }

  public async store({ request, response }: HttpContextContract) {
    // logic for saving user (registration)
    console.log(request.body())

    return response.redirect().toRoute('users.loginShow')
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
