import generateUniqueSlug from "../services/slugServices.js";


export default async (req, res, next) => {
    const { name } = req.body;
    const slug = await generateUniqueSlug(name);
    req.body.slug = slug;
    next();
}

