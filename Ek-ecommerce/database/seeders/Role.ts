import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Role.createMany([
      {
        name: 'USER',
        permissions: 'View products, add products to cart, add products to wishlist, make an order',
      },
      {
        name: 'CMS_USER',
        permissions: 'CRUD products',
      },

      {
        name: 'ADMIN',
        permissions: 'CRUD Products, CRUD Users',
      },
    ])
  }
}
