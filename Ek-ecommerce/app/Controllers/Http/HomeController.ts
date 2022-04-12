import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public home({ view }: HttpContextContract) {
    return view.render('main/index', { title: 'Ek-ecommerce Home' })
  }
  public error404({ view }: HttpContextContract) {
    return view.render('main/error404', { title: 'Error 404 not found' })
  }
}
