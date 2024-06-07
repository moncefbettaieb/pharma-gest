import Joi from "joi";

export const ProductValidation = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    suppliers: Joi.array(),
    published: Joi.date().required(),
    isbn: Joi.string().min(3).required(),
});

export const SupplierValidation = Joi.object({
    name: Joi.string().min(3).required(),
});

export const CustomerValidation = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2),
    dateOfBirth: Joi.date(),
    phoneNumber: Joi.string()/* .pattern(/^[0-9]{10}$/ )*/,
    email: Joi.string().email(),
    address: Joi.string(),
});

