import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Payments extends BaseSchema {
  protected tableName = 'payments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true, true)
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.string('product_name').notNullable()
      table.double('product_price')
      table.string('transaction_id').unique()
      table.enum('payment_type', ['x', 'y'])
      table.enum('payment_gateway', ['eSewa', 'Khalti'])
      table
        .enum('payment_status', ['INITIATED', 'PENDING', 'COMPLETED', 'CANCELED'])
        .defaultTo('INITIATED')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
