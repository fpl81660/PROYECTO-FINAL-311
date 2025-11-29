const User = require('../models/User');

class userService {

    async getAll() {
        try {
            const Users = await User.find();
            return Users; 
        } catch (error) {
            throw error;
        }
    }

    async getById(id){
        const Users = await User.findById(id);
        if (!Users){
            throw new Error('User Not Found'); 
        }

        return Users; 
    };

    async create(data){
        const newUser = new User(data); 
        return await newUser.save(); 
    }; 

    async update(id, data){
        const UserUpdated = await User.findByIdAndUpdate(id, data, {new: true});
        if(!UserUpdated){
            throw new Error('User Not Found');
        }
        return UserUpdated; 
    };
    
    async delete(id){
        const UserDeleted = await User.findByIdAndDelete(id);
        if(!UserDeleted){
            throw new Error('User Not Found');
        }
        return UserDeleted; 
    };

}

module.exports = new userService(); 