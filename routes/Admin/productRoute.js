const express = require('express')
const { getAllProducts , createProduct , updateProduct , deleteProduct , getProductDetails, createReviewProduct, getAllReviewProduct, deleteReviewProduct, getAdminProducts, updateProductStocks } = require('../../controllers/Admin/productController')
// const {isAuthenticatedUser , adminRoles} = require('../middleware/Auth')
const router = express.Router()


// router.route('/products').get(getAllProducts)
router.route('/products').get(getAllProducts)
router.route('/admin/products').get(getAdminProducts)
// router.route('/admin/products').get(isAuthenticatedUser,adminRoles('admin'),getAdminProducts)

// router.route('/products/:id').get(getProductDetails)

router.route('/admin/product/new').post(createProduct)
// router.route('/admin/product/new').post(isAuthenticatedUser , adminRoles('admin') , createProduct)

router
    .route('/admin/product/:id')
    .put(updateProduct)
    .delete(deleteProduct)
router
    .route('/admin/product-stock/:id')
    .put(updateProductStocks)
// router
//     .route('/admin/product/:id')
//     .put(isAuthenticatedUser , adminRoles('admin') , updateProduct)
//     .delete(isAuthenticatedUser , adminRoles('admin') , deleteProduct)


    router.route('/product/:id').get(getProductDetails)
    
    
    // router.route('/review').put(createReviewProduct)
    // router.route('/review').put(isAuthenticatedUser, createReviewProduct)
    

    // router.route('/reviews').get(getAllReviewProduct).delete(deleteReviewProduct)
    // router.route('/reviews').get(getAllReviewProduct).delete(isAuthenticatedUser,deleteReviewProduct)


// router.route('/product/:id').delete(deleteProduct)





module.exports = router