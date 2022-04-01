import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Favorites extends BaseSchema {
  protected tableName = 'favorites'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true, true)
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.integer('product_id').unsigned().references('id').inTable('products')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
