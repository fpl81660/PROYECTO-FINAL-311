const User = require('../models/User');
const Device = require('../models/Device');

class userService {

    async getAll() {
        try {
            const Users = await User.find();
            return Users;
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        const Users = await User.findById(id);
        if (!Users) {
            throw new Error('User Not Found');
        }

        return Users;
    };

async create(data) {
        const { name, email, password, role } = data; 
        const newUser = new User({ name, email, password, role });
        return await newUser.save();
    };

    async update(id, data) {
        const UserUpdated = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!UserUpdated) {
            throw new Error('User Not Found');
        }
        return UserUpdated;
    };

    async delete(id) {
        const userToDelete = await User.findById(id);
        if (!userToDelete) {
            throw new Error('User Not Found');
        }

        const userInDevice = await Device.findOne({ ownerId: id });
        if (userInDevice) {
            throw new Error('User has associated Devices and cannot be deleted');
        }

        await userToDelete.deleteOne();

        return userToDelete;
    };

}

module.exports = new userService(); 