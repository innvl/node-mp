module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('Users', [
            {
                'id': 'f578eb33-73ac-4876-b501-5a1c8b45a4ac',
                'isDeleted': true,
                'age': 29,
                'login': 'ff@bedlam.com',
                'password': 'Tennessee6',
                'createdAt': new Date(),
                'updatedAt': new Date()
            },
            {
                'id': 'f649011e-5d4b-43d4-801e-bc902810eb17',
                'isDeleted': false,
                'age': 59,
                'login': 'ffs@bedlam.com',
                'password': 'TennessSSee6',
                'createdAt': new Date(),
                'updatedAt': new Date()
            },
            {
                'id': 'f578eb33-73ac-4876-b501-5a1c8b45a4a1',
                'isDeleted': true,
                'age': 19,
                'login': 'fSAf@bedlam.com',
                'password': 'Tennsdessee6',
                'createdAt': new Date(),
                'updatedAt': new Date()
            },
            {
                'id': 'f649011e-5d4b-43d4-801e-bc902810eb12',
                'isDeleted': false,
                'age': 9,
                'login': 'ffsdss@bedlam.com',
                'password': 'TennessdSSee6',
                'createdAt': new Date(),
                'updatedAt': new Date()
            }
        ]);
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
