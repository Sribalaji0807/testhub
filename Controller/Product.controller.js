const CategorySchema = require('../Schema/Category.Schema');
const ProductSchema = require('../Schema/product');

async function GetAllProducts() {
    const categories = await CategorySchema.find().lean();
    const products = await ProductSchema.find().lean();

   

    // Filter out the main categories (parentCategory is null)
    const mainCategories = categories.filter((doc) => doc.parentCategory == null);

    const mainCategoryMap = {};
    const subCategoryMap = {};

    for (const mainCategory of mainCategories) {
        // Get subcategories for each main category
        const subCategories = categories.filter((doc) => doc.parentCategory?.toString() === mainCategory._id.toString());

        // Store subcategories under the main category name
        subCategoryMap[mainCategory.name] = subCategories;

        // Get products under each subcategory
        const productsInCategory = subCategories.flatMap((subCategory) => 
            products.filter((product) => 
                product.category?.toString() === subCategory._id.toString()
            )
        );
        const productsInMainCategory = products.filter((product) => 
            product.category?.toString() === mainCategory._id.toString()
        );

        // Combine both types of products
        mainCategoryMap[mainCategory.name] = [
            ...productsInMainCategory, 
            ... productsInCategory 
        ];

    }
   
    console.log("main",mainCategoryMap);
    console.log("sub",subCategoryMap);

    return [mainCategoryMap,subCategoryMap];
}

module.exports = GetAllProducts;
