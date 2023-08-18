// routes/product.routes.js

const { getAllProducts, createProduct, getOneProduct, deleteProduct, updateProduct} = require('../controllers/product.controller');

module.exports = function(app) {
    app.get('/api/products', getAllProducts);
    app.get('/api/products/:id', getOneProduct);
    app.post('/api/products', createProduct);
    app.patch('/api/products/:id', updateProduct);
    app.delete('/api/products/:id', deleteProduct);
};

