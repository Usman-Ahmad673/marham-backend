const express = require('express')
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../../controllers/Admin/orderController')
// const {isAuthenticatedUser , adminRoles} = require('../middleware/Auth')
const router = express.Router()


// router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/new').post(newOrder)
// router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)
router.route('/order/:id').get(getSingleOrder)
router.route('/orders/me').get(myOrders)
// router.route('/order/:id').get(isAuthenticatedUser, adminRoles('admin') , getSingleOrder)
// router.route('/orders/me').get(isAuthenticatedUser , myOrders)


router.route('/admin/orders').get(getAllOrders)
router.route('/admin/order/:id').put(updateOrderStatus).delete(deleteOrder)
// router.route('/admin/orders').get(isAuthenticatedUser, adminRoles('admin') , getAllOrders)
// router.route('/admin/order/:id').put(isAuthenticatedUser, adminRoles('admin') , updateOrderStatus).delete(isAuthenticatedUser, adminRoles('admin') , deleteOrder)


module.exports = router