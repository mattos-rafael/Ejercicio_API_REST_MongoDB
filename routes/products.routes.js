const productsController = require('../controllers/products.controllers');
const router = require('express').Router();

// GET
router.get("/products{/:id}", productsController.getProduct);

// POST
//BODY:
/* {
    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "price": 695,
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
      "rate": 4.6,
      "count": 400
      }
   } */
router.post("/products", productsController.createProduct)
router.put('/products', productsController.editProduct)

module.exports = router;