module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UserGroups', {
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
                primaryKey: true,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            groupId: {
                allowNull: false,
                type: Sequelize.UUID,
                primaryKey: true,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'Groups',
                    key: 'id'
                }
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
        await queryInterface.dropTable('UserGroups');
    }
};
