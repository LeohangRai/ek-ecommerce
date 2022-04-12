import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import SignupValidator from 'App/Validators/SignupValidator'

export default class AuthController {
  public async signupShow({ view }: HttpContextContract) {
    return view.render('main/auth/signupShow', { title: 'Sign up' })
  }

  public async signup({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(SignupValidator)

    // roleId:1 because that's the default roleId for new users that signup
    const user = await User.create({ ...payload, roleId: 1 })
    await auth.login(user)

    return response.redirect('/')
  }

  public loginShow({ view }: HttpContextContract) {
    return view.render('main/auth/loginShow', { title: 'Login' })
  }

  public async login({ auth, request, response, session }: HttpContextContract) {
    const uid = request.input('uid')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(uid, password)
      response.redirect('/')
    } catch {
      session.flash('errors', 'Invalid credentials!')
      response.redirect('back')
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.redirect().toRoute('auth.login')
  }
}
