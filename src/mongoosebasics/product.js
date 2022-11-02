const mongoose = require('mongoose');
const port = 27017;
const appName = "shopApp";
mongoose.connect(`mongodb://localhost:${port}/${appName}`)
    .then(() => {
        // Prints a message if it successfully connects
        console.log("Connection Open");
    })
    .catch(err => {
        // Prints the error if it does not connect
        console.log(`Error: ${err}`);
    });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number.']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

productSchema.methods.greet = function() {
    console.log("Hello There!");
    console.log(`-from ${this.name}`);
}

productSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function(newCat) {
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function() {
    return this.updateMany({}, { onSale: true, price: 0 });
}

const Product = mongoose.model('Product', productSchema);

// const findProduct = async() => {
//     const foundProduct = await Product.findOne({ name: 'City Test' });
//     console.log(foundProduct);
//     await foundProduct.toggleOnSale();
//     console.log(foundProduct);
//     await foundProduct.addCategory('Outdoors');
//     console.log(foundProduct);
// }

// findProduct();

Product.fireSale().then(res => console.log(res));

// const bike = new Product({ name: "City Test", price: 10000, onSale: true, categories: ['Cycling', 'Bike', 'Test'] });
// bike.save()
//     .then(data => {
//         console.log("You have successfully entered a new product.");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Failed to enter the product.");
//         console.log(err);
//     });

// const test = Product.findOneAndUpdate({ name: 'City Test' }, { price: -100 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log("You have successfully updated a product.");
//         return data;
//     })
//     .catch(err => {
//         console.log("Failed to enter the product.");
//         return null;
//     });