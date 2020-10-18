module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Groups', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUID
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            permissions: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('Groups');
    }
};
