const Product = require('../models/products.model');
const Provider = require('../models/provider.model')


// READ
const getProduct = async (req, res) => {
        try {
            const id = req.params.id;
            let products = id ? await Product.find({id},'-_id -__v').populate("provider", "company_name") : await Product.find({},'-_id -__v').populate("provider", "company_name CIF address url_web"); //{}
            res.status(200).json(products); // Respuesta de la API para 1 producto
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({msj:`ERROR: ${error.stack}`});
        }
}

// CREATE
const createProduct = async (req, res) => {

    try{
        let newProduct = req.body;
        const provider = await Provider.findOne({company_name: newProduct.provider})

        if (!provider) {
            return res.status(400).json({message: `Provider ${newProduct.provider} don't exist`})
        }

        newProduct.provider = provider.id

        let answer = await new Product(newProduct).save();
        res.status(201).json(answer);

    }catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
}

// UPATE
const editProduct = async (req, res) => {
    try {
        const {title, provider} = req.body
        const product = await Product.findOne({title: title})

        const new_title = req.body.new_title || product.title
        const price = req.body.price || product.price
        const description = req.body.description || product.description
        const new_provider = await Provider.findOne({company_name: provider}) || product.provider

        await Product.findOneAndUpdate({title: title}, {
                                                            title: new_title,
                                                            price: price,
                                                            description: description,
                                                            provider: new_provider._id
                                                        })
       
        res.status(200).json({message: `producto actualizado: ${title}`})

    } catch(err) {
        console.log(err);
        
        res.status(400).json({message: `ERROR: ${err.stack}`})
    }
}

// DELETE
const deleteProduct = async (req, res) => {
    try {
        const {title} = req.body
        await Product.findOndeAndDelete({title: title})

        res.status(200).json({message: `Se ha borrado el producto: ${title}`})

    } catch(err) {
        console.log(err);
        
        res.status(400).json({message: `ERROR: ${err.stack}`})
    }
}
module.exports = {
    createProduct,
    getProduct,
    editProduct,
    deleteProduct
}