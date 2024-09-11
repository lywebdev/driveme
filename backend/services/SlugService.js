import slugify from "slugify";
import Transport from "../models/TransportSchema.js";

const generateUniqueSlug = async (str) => {
  let slug = slugify(str, { lower: true });

  if (!await Transport.exists({ slug })) {
    return slug;
  }

  let counter = 2;
  let uniqueSlug = getNumberedSlug(slug, counter);

  while (await Transport.exists({ slug: uniqueSlug })) {
    if (counter > 50) {
      return crypto.randomBytes(25).toString('base64').slice(0, 25);
    }

    uniqueSlug = getNumberedSlug(slug, counter);
    counter++;
  }

  return uniqueSlug;
};

const getNumberedSlug = (slug, counter) => `${slug}-${counter}`;



export default generateUniqueSlug;
