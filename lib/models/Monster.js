const pool = require('../utils/pool');

module.exports = class Monster {
  id;
  name;
  type;
  size;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.size = row.size;
  }

  static async insert({ name, type, size }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
            monsters (name, type, size)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
        `,
      [name, type, size]
    );
    return new Monster(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            monsters
        `
    );
    return rows.map((row) => new Monster(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            monsters
        WHERE
            id=$1
            `,
      [id]
    );
    return new Monster(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
            monsters
        WHERE
            id=$1
        RETURNING
            *
        `,
      [id]
    );
    return new Monster(rows[0]);
  }

  static async updateById(id, att) {
    const monster = await Monster.findById(id);
    const updated = { ...monster, ...att };
    const { name, type, size } = updated;
    const { rows } = await pool.query(
      `
        UPDATE
            monsters
        SET
            name=$1,
            type=$2,
            size=$3
        WHERE
            id=$4
        RETURNING
            *
        `,
      [name, type, size, id]
    );
    return new Monster(rows[0]);
  }

};

