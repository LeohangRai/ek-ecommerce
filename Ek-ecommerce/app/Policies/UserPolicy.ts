import BasePolicy from 'App/Policies/BasePolicy'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  /* 
  returning false because no other users except ADMINs are allowed to CRUD users.
  ADMIN role has been allowed through the before() hook in BasePolicy.
  */

  public async viewList(_: User) {
    return false
  }

  //   public async view(user: User, user: User) {}

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
