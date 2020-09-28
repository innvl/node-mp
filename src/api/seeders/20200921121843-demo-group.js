module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('Group', [
            {
                name: 'OWNER',
                permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
            },
            {
                name: 'USER',
                permissions: ['READ', 'WRITE', 'SHARE', 'UPLOAD_FILES']
            },
            {
                name: 'VISITOR',
                permissions: ['READ']
            }
        ]);
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('Group', null, {});
    }
};
