import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CartProducts extends BaseSchema {
  protected tableName = 'cart_products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true, true)
      table.string('product_name')
      table.double('product_price')
      table.integer('quantity')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
