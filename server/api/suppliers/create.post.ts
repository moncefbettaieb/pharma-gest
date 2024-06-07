import SupplierModel from "~/server/db/models/Supplier.model";
import { SupplierValidation } from "~/server/validation";
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate the Supplier data
  const { error } = SupplierValidation.validate(body);
  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      message: error.message.replace(/"/g, ''),
      fatal: false,
      data: error.details,
    });
  }

  // Create a new Supplier
  try {
    await SupplierModel.create(body);
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
