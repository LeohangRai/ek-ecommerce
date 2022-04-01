import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true, true)
      table.string('name').notNullable().unique()
      table.string('slug').notNullable().unique()
      table.boolean('status').defaultTo(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
