import Product from "../models/Product.js";

// Add Product
const addProduct = async (req, res) => {
    try {
        const { name, price, stock, description, category, promotion } = req.body;

        let imageLinks = [];

        if (req.files) {
            req.files.forEach((file) => {
                imageLinks.push(file.path);
            });
        }

        const newProduct = new Product({
            name,
            price,
            stock,
            description,
            category,
            promotion,
            images: imageLinks
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await Product.deleteOne({ _id: id });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updateData = req.body;
//         console.log(req.files)

//         if (req.files) {
//             let updatedImages = {};
//             req.files.forEach((file) => {
//                 const color = file.fieldname;
//                 updatedImages[color] = file.path;
//             });
//             updateData.images = updatedImages;
//         }

//         const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
//             new: true,
//             runValidators: true
//         });

//         if (!updatedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.status(200).json({ message: 'Product updated successfully', updatedProduct });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Log uploaded files for debugging

        if (req.files && req.files.length > 0) {
            // Extract URLs from uploaded files
            const uploadedImages = req.files.map((file) => file.path); // Cloudinary URLs
            
            // If images field already exists, merge new images with existing ones
            const existingProduct = await Product.findById(id);
            if (existingProduct) {
                updateData.images = [...existingProduct.images, ...uploadedImages];
            } else {
                updateData.images = uploadedImages;
            }
        }

        // Update the product in the database
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
            new: true, // Return updated document
            runValidators: true, // Run schema validators
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ 
            message: 'Product updated successfully', 
            updatedProduct 
        });
    } catch (error) {
        console.error('Error during product update:', error.stack); // Log the full error stack
        res.status(500).json({ error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLatestProduct = async (req, res) => {
    try {
        const product = await Product.findOne({}, {}, { sort: { createdAt: -1 } }); 
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export { addProduct, deleteProduct, updateProduct, getProducts, getProduct, getLatestProduct };
