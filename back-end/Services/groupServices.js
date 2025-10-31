const GroupRepo = require("../Repositories/GroupRepo");

const groupRepo = new GroupRepo();

class GroupServices {
    async getAllGroups() {
        return await groupRepo.getAllGroups();
    }
    async getGroupById(id) {
        return await groupRepo.getGroupById(id);
    }
    async addGroup(group) {
        return await groupRepo.addGroup(group);
    }
    async updateGroup(id, group) {
        return await groupRepo.updateGroup(id, group);
    }
    async deleteGroup(id) {
        return await groupRepo.deleteGroup(id);
    }
}

module.exports = GroupServices;