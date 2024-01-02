const pool = require('../db');

class DatabaseUtils {
    constructor(tableName) {
      this.tableName = tableName;
    }
  
    // Function to fetch all columns of the table
    async fetchAllColumns() {
      const queryString = `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = $1;
      `;
      const result = await pool.query(queryString, [this.tableName]);
      return result.rows.map((column)=> column.column_name);
    }
  
    // Function to fetch columns with the constraint "not null"
    async fetchNotNullColumns() {
      const queryString = `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = $1
        AND is_nullable = 'NO';
      `;
      const result = await pool.query(queryString, [this.tableName]);
      //   console.log("result ", result);
      return result.rows.map((column)=> column.column_name);
    }
  
    // Function to fetch columns with the constraint "auto-increment"
    async fetchAutoIncrementColumns() {
      const queryString = `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = $1
        AND column_default LIKE 'nextval%';
      `;
      const result = await pool.query(queryString, [this.tableName]);
      return result.rows;
    }
  
    // Function to fetch columns with default value constraint
    async fetchDefaultConstraintColumns() {
      const queryString = `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = $1
        AND column_default IS NOT NULL;
      `;
      const result = await pool.query(queryString, [this.tableName]);
      return result.rows.map((column)=> column.column_name);
    }
  
    // Function to filter columns that do not have any of the specified constraints
    async filterColumnsWithoutConstraints() {
      const allColumns = await this.fetchAllColumns();
      const notNullColumns = await this.fetchNotNullColumns();
      const autoIncrementColumns = await this.fetchAutoIncrementColumns();
      const defaultConstraintColumns = await this.fetchDefaultConstraintColumns();
      
      console.log("allColumns", allColumns);
      console.log("defaultConstraintColumns", defaultConstraintColumns);

      const columnsWithoutConstraints = allColumns.filter((column) => {
        return (
          !notNullColumns.includes(column) &&
          !autoIncrementColumns.includes(column) &&
          !defaultConstraintColumns.includes(column)
        );
      });
      
      console.log("columnsWithoutConstraints", columnsWithoutConstraints);
      return columnsWithoutConstraints;
    }
}

module.exports = DatabaseUtils;