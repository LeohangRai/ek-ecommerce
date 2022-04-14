import { BasePolicy as BouncerBasePolicy } from '@ioc:Adonis/Addons/Bouncer'

import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class BasePolicy extends BouncerBasePolicy {
  public async before(user: User | null) {
    const adminRole = await Role.findBy('name', 'ADMIN')
    if (user?.roleId === adminRole?.id) {
      return true
    }
  }
}
