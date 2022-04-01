import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true, true)
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.integer('payment_id').unsigned().references('id').inTable('payments')
      table.integer('quantity')
      table.string('order_number').unique()
      table
        .enum('order_status', ['PLACED', 'VERIFIED', 'SHIPPED', 'DELIVERED', 'CANCELED'])
        .defaultTo('PLACED')
      table.double('total_price')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
