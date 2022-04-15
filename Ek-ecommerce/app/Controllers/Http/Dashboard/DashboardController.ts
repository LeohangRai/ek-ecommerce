import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {
  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('DashboardPolicy').authorize('index')
    return view.render('dashboard/index', { title: 'Dashboard' })
  }

  public async error404({ view, bouncer }: HttpContextContract) {
    await bouncer.with('DashboardPolicy').authorize('index')
    return view.render('dashboard/error404', { title: 'Error! Page not found' })
  }
}
