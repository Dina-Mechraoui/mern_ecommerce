import Product from "../models/Product.js";

const addProduct = async (req, res) => {
    try {
        // Log the request body to check the incoming product data
        console.log("Received product data:", req.body);

        const { name, price, stock, description, category, promotion } = req.body;

        let imageLinks = [];

        // Check if files are present and log them
        if (req.files) {
            console.log("Received files:", req.files);
            req.files.forEach((file) => {
                imageLinks.push(file.path);
            });
        } else {
            console.log("No files received.");
        }

        // Parse the stock field if it's a string (e.g., if it's received as a stringified array)
        let parsedStock = [];
        if (stock) {
            try {
                parsedStock = JSON.parse(stock); // This will convert the stringified stock into an array
            } catch (error) {
                console.error("Error parsing stock:", error.message);
            }
        }

        // Log the image links that were generated
        console.log("Image links:", imageLinks);

        // Create the new product object
        const newProduct = new Product({
            name,
            price,
            stock: parsedStock, // Use the parsed stock array
            description,
            category,
            promotion,
            images: imageLinks
        });

        // Log the product data before saving
        console.log("Creating new product:", newProduct);

        // Save the new product to the database
        await newProduct.save();

        // Log success message
        console.log("Product added successfully:", newProduct);

        // Send the response
        res.status(201).json({ message: "Product added successfully", newProduct });
    } catch (error) {
        // Log the error for debugging
        console.error("Error adding product:", error.message);

        // Send the error response
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

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.files && req.files.length > 0) {
            const uploadedImages = req.files.map((file) => file.path);

            const existingProduct = await Product.findById(id);
            if (existingProduct) {
                updateData.images = [...existingProduct.images, ...uploadedImages];
            } else {
                updateData.images = uploadedImages;
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ 
            message: 'Product updated successfully', 
            updatedProduct 
        });
    } catch (error) {
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
