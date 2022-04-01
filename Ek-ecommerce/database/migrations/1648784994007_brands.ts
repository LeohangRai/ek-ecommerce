import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Brands extends BaseSchema {
  protected tableName = 'brands'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true, true)
      table.string('name').unique().notNullable()
      table.string('slug').unique().notNullable()
      table.integer('products_count')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
