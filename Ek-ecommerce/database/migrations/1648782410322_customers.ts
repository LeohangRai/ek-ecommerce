import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Customers extends BaseSchema {
  protected tableName = 'customers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true, true)
      table.string('username').unique().notNullable()
      table.string('password')
      table.string('address')
      table.integer('phone', 10).notNullable().unique()
      table.string('email').notNullable()
      table.string('profile_image').unique()
      table.boolean('is_active').defaultTo(false)
      table.string('token')
      table.dateTime('token_expiry_date')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
