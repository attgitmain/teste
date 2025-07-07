import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('ReportLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      companyId: {
        type: DataTypes.INTEGER,
        references: { model: 'Companies', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      toNumber: {
        type: DataTypes.STRING
      },
      body: {
        type: DataTypes.TEXT
      },
      success: {
        type: DataTypes.BOOLEAN
      },
      error: {
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('ReportLogs');
  }
};
