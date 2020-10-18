module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('Groups', [
            {
                id: '3959f3b8-017d-11eb-adc1-0242ac120002',
                name: 'OWNER',
                permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: '41ceea94-017d-11eb-adc1-0242ac120002',
                name: 'USER',
                permissions: ['READ', 'WRITE', 'SHARE', 'UPLOAD_FILES'],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: '483b5e4e-017d-11eb-adc1-0242ac120002',
                name: 'VISITOR',
                permissions: ['READ'],
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('Groups', null, {});
    }
};
