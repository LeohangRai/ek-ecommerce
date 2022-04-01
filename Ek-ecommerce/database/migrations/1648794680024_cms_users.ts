import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CmsUsers extends BaseSchema {
  protected tableName = 'cms_users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true, true)
      table.integer('role_id').unsigned().references('id').inTable('roles')
      table.string('username').unique()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.string('address')
      table.boolean('status')
      table.string('token')
      table.dateTime('token_expiry_date')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
