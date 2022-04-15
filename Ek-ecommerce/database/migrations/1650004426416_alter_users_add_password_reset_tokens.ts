import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterUsersAddPasswordResetTokens extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('password_reset_token').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('password_reset_token')
    })
  }
}
