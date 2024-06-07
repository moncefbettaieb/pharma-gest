import SupplierModel from "~/server/db/models/Supplier.model";
import { SupplierValidation } from "~/server/validation";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const id = event.context.params.id;

  let {error} = SupplierValidation.validate(body, {abortEarly: true, allowUnknown: true});
  if (error) {
    throw createError({ message: error.message.replace(/"/g, ''), statusCode: 400, fatal: false });
  }
  try {
    await SupplierModel.findByIdAndUpdate(id, body);
    return {message: "Supplier updated!"};
  } catch (err) {
    throw createError({ message: err.message});
  }
});

