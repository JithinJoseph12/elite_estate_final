const express = require('express')
const userController = require('../controllers/userController')
const multerMiddleware = require('../middlewares/multerMiddleware')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const listingController = require('../controllers/listingController')

const router = new express.Router()

router.get('/test', (req, res) => {
  res.json({
    message: "hello world!"
  })
})

//user SignUP
router.post("/register", userController.registerController)
//user SignIn
router.post("/login", userController.loginController)

// Profile Update with JWT authorization and multer for profile picture upload
router.put('/profile', jwtMiddleware, multerMiddleware.single('profilePic'), userController.editUserController)

// Creating a listing with image upload handling
router.post(
  '/listings',
  jwtMiddleware,
  multerMiddleware.array('imageUrls', 5), // Allow up to 5 images
  listingController.createListingController
)

// Fetching the listings created by the user
router.get('/user-listings', jwtMiddleware, listingController.userListingController)

// Deleting a listing by ID
router.delete('/listing-delete/:id', jwtMiddleware, listingController.deleteListingController)

// Get a specific listing by its ID
router.get('/listings/:id', listingController.getListingByIdController);

// Updating an existing listing by ID
router.put(
  '/listings/:id',
  jwtMiddleware, 
  multerMiddleware.array('imageUrls', 5), // Allow up to 5 images for updating
  listingController.updateListingController
)
// Get all listings (public)
// router.get('/listings', listingController.getAllListingsController);


module.exports = router
