/**
 * @param {import('knex')} knex
 */
exports.up = function (knex) {
    return knex.schema.createTable('about', (table) => {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.string('img1', 255);
      table.text('par1');
      table.text('par2');
      table.text('slug1');
      table.text('slug2');
      table.string('img2', 255);
      table.string('link', 255);
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };
  
  /**
   * @param {import('knex')} knex
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('about');
  };
  