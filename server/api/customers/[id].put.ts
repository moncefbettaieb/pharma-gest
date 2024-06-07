import CustomerModel from "~/server/db/models/Customer.model";
import { CustomerValidation } from "~/server/validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = event.context.params.id;

  let {error} = CustomerValidation.validate(body, {abortEarly: true, allowUnknown: true});
  if (error) {
    throw createError({ message: error.message.replace(/"/g, ''), statusCode: 400, fatal: false });
  }
  try {
    await CustomerModel.findByIdAndUpdate(id, body);
    return {message: "Customer modifier!"};
  } catch (err) {
    throw createError({ message: err.message});
  }
});

