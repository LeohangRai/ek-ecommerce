import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true, true)
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.integer('brand_id').unsigned().references('id').inTable('brands')
      table.string('name')
      table.string('slug').notNullable().unique()
      table.text('description')
      table.double('price')
      table.double('discount_price')
      table.boolean('delivery').defaultTo(false)
      table.string('image')
      table.boolean('status')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
