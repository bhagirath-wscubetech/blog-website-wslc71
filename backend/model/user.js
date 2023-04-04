const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 60
        },
        email: {
            type: String,
            maxLength: 100
        },
        password: {
            type: String,
            minLength: 10,
            maxLength: 20
        },
        contact: {
            type: Number,
            max: 9999999999,
            default: null
        },
        age: {
            type: Number,
            min: 1,
        },
        gender: {
            type: String,
            enum: ['M', 'F', 'O']
        },
        status: {
            type: Boolean,
            default: true
            // true -> active, false -> inactive
        },
        createdAt: {
            type: String,
            default: new Date().toLocaleDateString()
        }

    }
)

const User = mongoose.model("User", UserSchema);

module.exports = User;