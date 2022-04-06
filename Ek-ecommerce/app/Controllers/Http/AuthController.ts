import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { createUser, validationMessages, validationSchema } from 'App/Account'

export default class AuthController {
  public async signupShow({ view }: HttpContextContract) {
    return view.render('auth/signupShow', { title: 'Sign up' })
  }

  public async signup({ request, response, auth }: HttpContextContract) {
    const userDetails = await request.validate({
      schema: validationSchema,
      messages: validationMessages,
    })

    const user = await createUser(
      userDetails.username,
      userDetails.email,
      userDetails.password,
      userDetails.phone
    )
    await auth.login(user)

    return response.redirect('/')
  }

  public loginShow({ view }: HttpContextContract) {
    return view.render('auth/loginShow', { title: 'Login' })
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
