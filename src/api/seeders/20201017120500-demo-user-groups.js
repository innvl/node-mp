module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('UserGroups', [
            {
                groupId: '3959f3b8-017d-11eb-adc1-0242ac120002',
                userId: 'f578eb33-73ac-4876-b501-5a1c8b45a4ac',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('UserGroups', null, {});
    }
};
