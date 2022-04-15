import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import ForgotPasswordMailValidator from 'App/Validators/ForgotPasswordMailValidator'
import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class PasswordResetController {
  public async forgotPasswordShow({ view }: HttpContextContract) {
    return view.render('main/passwordReset/forgotPasswordShow', { title: 'Forgot password' })
  }

  public async forgotPasswordMail({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(ForgotPasswordMailValidator)
    const user = await User.findBy('email', payload.email)
    const resetPasswordFormUrl = Route.makeSignedUrl(
      'auth.resetPasswordShow',
      {
        email: payload.email,
      },
      {
        expiresIn: '30m',
        prefixUrl: `http://localhost:${Env.get('PORT')}`.toString(),
      }
    )

    try {
      await Mail.send((message) => {
        message
          .from('passwordreset@ekecommerce.com')
          .to(payload.email)
          .subject('Password Reset')
          .htmlView('emails/reset_password', {
            user,
            resetPasswordFormUrl,
          })
      })
      session.flash('success', 'A password reset link has been sent to your email.')
      return response.redirect('back')
    } catch (e) {
      session.flash('errors_others', e.message)
      return response.redirect('back')
    }
  }

  public async resetPasswordShow({ view, request, params }: HttpContextContract) {
    if (request.hasValidSignature()) {
      const user = await User.findByOrFail('email', params.email)
      user.passwordResetToken = string.generateRandom(32)
      const userWithResetToken = await user.save()
      return view.render('main/passwordReset/resetPasswordShow', {
        title: 'Reset password',
        userWithResetToken,
      })
    } else {
      return view.render('main/error404', { title: 'Error 404 not found' })
    }
  }

  public async resetPassword({ request, response, params, session }: HttpContextContract) {
    const payload = await request.validate(ResetPasswordValidator)
    const user = await User.findByOrFail('email', params.email)

    //passwordRestToken comes from a hidden input field
    if (request.input('passwordResetToken') === user.passwordResetToken) {
      user.password = payload.password
      user.passwordResetToken = ''
      await user.save()
      session.flash('success', 'Your password has been updated successfully')
      return response.redirect().toRoute('auth.loginShow')
    } else {
      session.flash('errors_others', 'Invalid reset token')
      return response.redirect('back')
    }
  }
}
