
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUID,
                primaryKey: true,
                allowNull: false
            },
            login: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('Users');
    }
};
