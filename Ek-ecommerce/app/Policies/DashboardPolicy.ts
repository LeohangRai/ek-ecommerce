import BasePolicy from 'App/Policies/BasePolicy'
import User from 'App/Models/User'
import Role from 'Contracts/enums/Role'

export default class DashboardPolicy extends BasePolicy {
  public async index(user: User) {
    //no need to check Role.ADMIN because the before() hook will do it
    return user.roleId === Role.CMS_USER
  }
}
