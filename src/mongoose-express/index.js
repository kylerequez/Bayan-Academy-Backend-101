const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("Connection open...");
    }).catch((err) => {
        console.log("Something went wrong...");
        console.log(err)
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy']

// Create
app.get('/products/new', (req, res) => {
    res.render('products/new', {
        categories
    });
});
// Add product
app.post('/products', async(req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
});
// Display all products
app.get('/products', async(req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/products', {
            products,
            category
        });
    };
    const products = await Product.find({});
    res.render('products/products', {
        products,
        category: 'All'
    })
});
// View a product
app.get('/products/:_id', async(req, res) => {
    const { _id } = req.params;
    const product = await Product.findById(_id);
    res.render('products/product', {
        product
    });
});
// Update product display
app.get('/products/edit/:_id', async(req, res) => {
    const { _id } = req.params;
    const product = await Product.findById(_id);
    res.render('products/edit', {
        product,
        categories
    })
});
// Update product
app.put('/products/:_id', async(req, res) => {
    const { _id } = req.params;
    const product = await Product.findByIdAndUpdate(_id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${_id}`);
});

app.delete('/products/:_id', async(req, res) => {
    const { _id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(_id);
    res.redirect("/products");
});

const port = 1808
app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
});