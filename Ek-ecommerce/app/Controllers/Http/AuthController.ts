import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { createUser, validationSchema } from 'App/Account'

export default class AuthController {
  public async signupShow({ view }: HttpContextContract) {
    return view.render('auth/signupShow', { title: 'Sign up' })
  }

  public async signup({ request, response }: HttpContextContract) {
    const userDetails = await request.validate({
      schema: validationSchema,
      messages: {
        'required': 'The {{ field }} is required for creating a new account',
        'email.unique': 'Email already in use',
        'username.unique': 'The username is already in use',
        'phone.unique': 'The phone number is already in use',
        'password.confirmed': "The passwords don't match",
      },
    })
    await createUser(
      userDetails.username,
      userDetails.email,
      userDetails.password,
      userDetails.phone
    )

    return response.redirect('/')
  }

  public loginShow({ view }: HttpContextContract) {
    return view.render('auth/loginShow', { title: 'Login' })
  }

  public async login({ auth, request, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/')
    } catch {
      session.flash('errors', 'Invalid credentials!')
      response.redirect('back')
    }
  }

  public signout({ response }: HttpContextContract) {
    return response.redirect('/')
  }
}
