import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Roles extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('description')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('description')
    })
  }
}
