const ActivityRepo = require('../Repositories/ActivityRepo');

const activityRepo = new ActivityRepo();

class ActivityServices {
    async getAllActivities() {
        return await activityRepo.getAllActivities();
    }
    async getActivityById(id) {
        return await activityRepo.getActivityById(id);
    }
    async addActivity(activity) {
        return await activityRepo.addActivity(activity);
    }
    async updateActivity(id, activity) {
        return await activityRepo.updateActivity(id, activity);
    }
    async deleteActivity(id) {
        return await activityRepo.deleteActivity(id);
    }
}

module.exports = ActivityServices;