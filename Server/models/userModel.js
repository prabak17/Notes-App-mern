const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// pre - saving operation
userSchema.pre('save', async function (next){
    
    // checking if password is modified or not
    if(!this.isModified('password')){
        next();
    }

    // creating salt and then adding it to password - encrypting the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


// mongoose.model(modelName, schema)
const User = mongoose.model("User",userSchema);

module.exports = User;