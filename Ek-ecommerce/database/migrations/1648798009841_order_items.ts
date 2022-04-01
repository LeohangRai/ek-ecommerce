import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrderItems extends BaseSchema {
  protected tableName = 'order_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true, true)
      table.integer('order_id').unsigned().references('id').inTable('orders')
      table.string('product_name')
      table.double('product_price')
      table.integer('quantity')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
