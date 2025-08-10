const { default: mongoose } = require("mongoose");
const validator = require('validator');
// schema of the User
const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20,
    },
    lastName : {
        type  : String,
        required : true,
        minlength : 3,
        maxlength : 20,
    },
    emailId: {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : {
            value : true,
            message : 'Entry already exist'
        },
        validate : {
            validator : function(value)  {
               return validator.isEmail(value)
            },
            message: props =>  `${props.value} is Not valid Email ID`
        }
    },
    phoneNumber: {
        type: String,
        required : true,
        minlength : 10,
        maxlength : 10,
        validate : {
            validator : function(value) {
                return validator.isMobilePhone(value)
            },
            message: (props) => `${props.value} is not a valid phone number.`,
        }
    },
    address : {
        type: String,
        required : true,
        minlength : 10,
        maxlength : 50,
    },
    gender : {
        type : String,
        required : true,
        lowercase : true,
        lowercase : true,
        validate : {
            validator : function (value){
                const geneder = ['male', 'female', 'others']
               return geneder.includes(value.toLowerCase())
            }
        }
      
    },
    password : {
        type : String,
        required : true,
        validate : {
            validator : function(value){
                return validator.isStrongPassword(value)
            },

            message: () =>
                `Password must be strong: include upper/lowercase letters, numbers, and symbols.`,
            
        }
        
    },
    profilePic : {
        type: String,
        validate : {
            validator : function(value){
                return validator.isURL(value)
            },

            message: (props) => `${props.value} is not a valid URL.`,
        },
       
    },
    status : {
        type: String,
        lowercase : true,
        enum : {
            values : ['active', 'inactive'],
            message : 'Invalid Status'
        },
        default : 'active'

    },
},{
    
})



userSchema.pre('save', function(next) {
    if (!this.profilePic) {
        console.log(this.gender, "this.gender");
        this.profilePic = this.gender == 'male' ? 'https://www.webxcreation.com/event-recruitment/images/profile-1.jpg' : 'https://i.pinimg.com/564x/42/0a/f8/420af8bda52fe027d117c3bbf4dbf2dd.jpg';
        
    }
    next();
});


// this is the model of the user
module.exports = mongoose.model("User", userSchema)