import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Admins extends BaseSchema {
  protected tableName = 'admins'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true, true)
      table.integer('role_id').unsigned().references('id').inTable('roles')
      table.string('username').unique()
      table.string('password').notNullable()
      table.boolean('status')
      table.string('token')
      table.dateTime('token_expiry_date')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
