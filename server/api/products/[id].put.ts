import ProductModel from "~/server/db/models/Product.model";
import { ProductValidation } from "~/server/validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = event.context.params.id;

  let {error} = ProductValidation.validate(body, {abortEarly: true, allowUnknown: true});
  if (error) {
    throw createError({ message: error.message.replace(/"/g, ''), statusCode: 400, fatal: false });
  }
  try {
    await ProductModel.findByIdAndUpdate(id, body);
    return {message: "Product updated!"};
  } catch (err) {
    throw createError({ message: err.message});
  }
});

