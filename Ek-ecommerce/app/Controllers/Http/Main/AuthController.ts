import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import SignupValidator from 'App/Validators/SignupValidator'

export default class AuthController {
  public async signupShow({ view, auth }: HttpContextContract) {
    if (auth.isLoggedIn) {
      return view.render('errors/already-logged-in')
    }
    return view.render('main/auth/signupShow', { title: 'Sign up' })
  }

  public async signup({ request, response, auth, session, view }: HttpContextContract) {
    // checking the DB connection and blocking the request.validate() code execution if there is a DB connection error
    try {
      await User.findOrFail(1)
    } catch (e) {
      // DB connection error
      if (e.code === 'ECONNREFUSED') {
        session.flash('errors_others', 'Database connection failed')
      }
      return response.redirect('back')
    }

    if (auth.isLoggedIn) {
      return view.render('errors/already-logged-in')
    }

    const payload = await request.validate(SignupValidator)
    try {
      // roleId:1 because that's the default roleId for new users that signup from main ecommerce site
      const user = await User.create({ ...payload, roleId: 1 })
      await auth.login(user)

      return response.redirect('/')
    } catch (e) {
      // DB connection error
      if (e.code === 'ECONNREFUSED') {
        session.flash('errors_others', 'Database connection failed')
      } else {
        session.flash('errors_others', e.message)
      }
      return response.redirect('back')
    }
  }

  public loginShow({ view, auth }: HttpContextContract) {
    if (auth.isLoggedIn) {
      return view.render('errors/already-logged-in')
    }
    return view.render('main/auth/loginShow', { title: 'Login' })
  }

  public async login({ auth, request, response, session, view }: HttpContextContract) {
    if (auth.isLoggedIn) {
      return view.render('errors/already-logged-in')
    }
    const uid = request.input('uid')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(uid, password)
      return response.redirect('/')
    } catch (e) {
      if (e.code === 'E_INVALID_AUTH_UID' || e.code === 'E_INVALID_AUTH_PASSWORD') {
        session.flash('errors_invalid_credentials', 'Invalid username or password')
      }
      // DB connection error
      else if (e.code === 'ECONNREFUSED') {
        session.flash('errors_others', 'Database connection failed')
      } else {
        session.flash('errors_others', e.message)
      }
      return response.redirect('back')
    }
  }

  public async logout({ response, auth, session }: HttpContextContract) {
    try {
      await auth.logout()
      return response.redirect().toRoute('auth.login')
    } catch (e) {
      session.flash('errors_others', e.message)
      return response.redirect('back')
    }
  }
}
