import ProductModel from "~/server/db/models/Product.model";
import { ProductValidation } from "~/server/validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate the product data
  const { error } = ProductValidation.validate(body);
  if (error) {
    throw createError({
      statusCode: 4000,
      statusMessage: 'Validation Error',
      message: error.message.replace(/"/g, ''),
      fatal: false,
      data: error.details,
    });
  }

  // Create a new product
  try {
    await ProductModel.create(body);
    return {
      statusCode: 201,
      message: "Produit Créé!",
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: err,
    });
  }
});
