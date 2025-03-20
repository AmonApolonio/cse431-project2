const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllProducts = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const products = await mongodb.getDatabase().db().collection('products').find().toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving products", error: err.message });
    }
};

const getSingleProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const productId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db().collection('products').findOne({ _id: productId });

        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving product", error: err.message });
    }
};

const createProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity,
            category: req.body.category,
            brand: req.body.brand,
            rating: req.body.rating || 0,
            reviewCount: req.body.reviewCount || 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('products').insertOne(product);

        if (response.acknowledged) {
            res.status(201).json({ message: "Product created successfully", productId: response.insertedId });
        } else {
            res.status(500).json({ message: "Failed to create product" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error creating product", error: err.message });
    }
};

const updateProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const productId = ObjectId.createFromHexString(req.params.id);

        // Check if product exists before updating
        const existingProduct = await mongodb.getDatabase().db().collection('products').findOne({ _id: productId });
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity,
            category: req.body.category,
            brand: req.body.brand,
            rating: req.body.rating !== undefined ? req.body.rating : existingProduct.rating,
            reviewCount: req.body.reviewCount !== undefined ? req.body.reviewCount : existingProduct.reviewCount,
            updatedAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, product);

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "Product updated successfully" });
        } else {
            res.status(200).json({ message: "No changes made to product" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating product", error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const productId = ObjectId.createFromHexString(req.params.id);

        const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting product", error: err.message });
    }
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
