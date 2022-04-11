import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterUsersAddRoleIds extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('role_id').defaultTo(1)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role_id')
    })
  }
}
