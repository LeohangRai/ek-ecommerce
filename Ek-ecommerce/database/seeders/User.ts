import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        username: 'USER',
        password: 'password',
        email: 'user@gmail.com',
        phone: '123456789',
        roleId: 1,
      },
      {
        username: 'CMS_USER',
        password: 'password',
        email: 'cmsuser@gmail.com',
        phone: '9876543210',
        roleId: 2,
      },
      {
        username: 'ADMIN',
        password: 'password',
        email: 'admin@gail.com',
        phone: '9860172681',
        roleId: 3,
      },
    ])
  }
}
