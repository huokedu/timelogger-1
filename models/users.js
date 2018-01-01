var mongoose =  require('mongoose');
var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }, 
    password:{
        type: String,
        required: true
    },
    access: {
        type: String,
        required:true,
        enum:['admin', 'staff'],
        default: 'staff'
    }
})

module.exports = mongoose.model('users', userSchema);