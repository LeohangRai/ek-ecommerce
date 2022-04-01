import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Roles extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true, true)
      table.string('name').unique().notNullable()
      table.string('slug').unique().notNullable()
      table.text('description')
      table.text('permissions')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
