import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrder, TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';


const fullNameSchema = new Schema<TFullName>({
    firstName: {
        type: String,
        required: [true, 'First name is required!'],
        trim: true,
        maxlength: [20, "First name must be less than 20 characters!"]
    },
    lastName: {
        type: String,
        required: [true, 'last name is required!'],
        trim: true,
        maxlength: [20, "last name must be less than 20 characters!"]
    },
});
const addressSchema = new Schema<TAddress>({
    street: {
        type: String,
    },
    city: {
        type: String,
        trim: true,
        required: [true, "City name is required"]
    },
    country: {
        type: String,
        trim: true,
        required: [true, "Country name is required"]
    },
});
const orderSchema = new Schema<TOrder>({
    productName: {
        type: String,
        trim: true, 
        required: [true, 'Product name is required']
    },
    price: {
        type: Number,
        trim: true, 
        required: [true, 'Price is required']
    },
    quantity: {
        type: Number,
        trim: true, 
        required: [true, 'Quantity is required']
    },
});
const userSchema = new Schema<TUser, UserModel>({
    userId: {
        type: Number,
        unique: true,
        required: [true, 'User Id is required']
    },
    username: {
        type: String,
        maxlength: [15, "Username must be less than 15 characters!"],
        unique: true,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, "Password must be more than 5 characters!"],
        maxlength: [20, 'Password must be less than 20 characters'],
    },
    fullName: {
        type: fullNameSchema,
        required: [true, "Full name is required!"]
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: {
        type: [String], 
        required: [true, "Hobbies are required"],
    },
    address: {
        type: addressSchema,
        required: [true, "Address is required"]
    },
    orders: {
        type: [orderSchema],
        default: [],
    }
})


userSchema.pre('save', async function(next){
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(20),
    );
    next();
})
userSchema.post('save', function (doc, next) {
    doc.password = '';
    doc.orders = [];
    next();
});
userSchema.post('findOne', function (doc, next) {
    if(!doc){
        throw new Error("User doesn't exist!")
    }
    doc.password = '';
    next();
});

//check if a user is already existed or not
userSchema.statics.isUserExists = async function (userId: string) {
    const existingUser = await User.findOne({ userId });
    return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);