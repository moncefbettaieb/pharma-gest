import mongoose from "mongoose";

const customerSchema: mongoose.Schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    email: { type: String, required: false, unique: false },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
},
{ timestamps: true });

export default mongoose.model("Customer", customerSchema);