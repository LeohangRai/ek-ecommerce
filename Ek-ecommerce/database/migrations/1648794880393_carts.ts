import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Carts extends BaseSchema {
  protected tableName = 'carts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true, true)
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.double('total_price')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
