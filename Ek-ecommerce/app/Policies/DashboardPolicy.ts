import BasePolicy from 'App/Policies/BasePolicy'
import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class DashboardPolicy extends BasePolicy {
  public async index(user: User) {
    // no need to check Role.ADMIN because the before() hook from BasePolicy will do it
    // no need to check anonymous user because allowGuest:false by default
    const cmsRole = await Role.findBy('name', 'CMS_USER')
    return user.roleId === cmsRole?.id
  }
}
