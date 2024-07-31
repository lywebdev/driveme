import slugify from "slugify";
import Transport from "../models/TransportSchema.js";

const generateUniqueSlug = async (name) => {
  let slug = slugify(name, { lower: true });
  let uniqueSlug = slug;
  let counter = 1;

  while (await Transport.exists({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};

export default generateUniqueSlug;
