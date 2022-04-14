import BasePolicy from 'App/Policies/BasePolicy'
import User from 'App/Models/User'

export default class RolePolicy extends BasePolicy {
  /* 
  returning false because no other users except ADMINs are allowed to CRUD roles.
  ADMIN role has been allowed through the before() hook in BasePolicy.
  */
  public async viewList(_: User) {
    return false
  }

  public async create(_: User) {
    return false
  }

  public async update(_: User) {
    return false
  }

  public async delete(_: User) {
    return false
  }
}
