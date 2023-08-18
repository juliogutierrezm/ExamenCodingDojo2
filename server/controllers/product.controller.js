const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const ProductModel = require("../models/product.models");

module.exports = {
    getAllProducts: (req, res) => {
        ProductModel.find({}, { _id: true, reviewerName: true, movieName: true, reviewText: true,rating: true })
            .then((products) => {
                res.json({ data: products });
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    },
    getOneProduct: (req, res) => {
        let id = req.params.id;
        if (!ObjectId.isValid(id))
            return res.status(400).json({ message: "id doesn't match the expected format" });
        ProductModel.find({ _id: id })
            .then((product) => {
                res.json({ data: product });
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    },
      
    createProduct: (req, res) => {
        let data = req.body;
        ProductModel.create(data)
            .then((product) => {
                res.json({ data: product });
            })
            .catch((error) => {
                if (error instanceof mongoose.Error.ValidationError) {
                    let keys = Object.keys(error.errors);
                    let error_dict = {};
                    keys.map((key) => {
                        error_dict[key] = error.errors[key].message;
                    });
                    res.status(500).json({ error: error_dict });
                } else {
                    res.status(500).json({ error: error });
                }
            });
    },
    deleteProduct: (req, res) => {
        let id = req.params.id;
        if (!ObjectId.isValid(id))
            return res.status(400).json({ message: "id doesn't match the expected format" });
        ProductModel.deleteOne({ _id: id })
            .then(() => {
                res.json({ success: true });
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    },
    updateProduct: (req, res) => {
        let id = req.params.id;
        let data = req.body;
        const updateOptions = {
            new: true, // Return the updated document
            runValidators: true, // Enforce validation during update
        };
        if (!ObjectId.isValid(id))
            return res.status(400).json({ message: "id doesn't match the expected format" });
        ProductModel.findByIdAndUpdate({ _id: id }, data, updateOptions)
            .then(() => {
                res.json({ success: true });
            })
            .catch((error) => {
                if (error instanceof mongoose.Error.ValidationError) {
                    let keys = Object.keys(error.errors);
                    let error_dict = {};
                    keys.map((key) => {
                        error_dict[key] = error.errors[key].message;
                    });
                    res.status(500).json({ error: error_dict });
                } else {
                    res.status(500).json({ error: error });
                }
            });
    },
};
