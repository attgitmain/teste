import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Ensure sequence exists and column id uses it as default
    await queryInterface.sequelize.query(
      'CREATE SEQUENCE IF NOT EXISTS "Messages_id_seq"'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "Messages" ALTER COLUMN "id" SET DEFAULT nextval(\'"Messages_id_seq"\'::regclass)'
    );
    await queryInterface.sequelize.query(
      `SELECT setval('"Messages_id_seq"'::regclass, COALESCE((SELECT MAX(id::bigint) FROM "Messages" WHERE id ~ '^[0-9]+$'), 0))`
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      'ALTER TABLE "Messages" ALTER COLUMN "id" DROP DEFAULT'
    );
  }
};