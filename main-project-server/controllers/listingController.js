const Listing = require('../models/listingModel');
const jwt = require('jsonwebtoken')

exports.createListingController = async (req, res) => {
  console.log("inside project controller");
  
  const userId = req.userId;  // from jwtMiddleware
  console.log(userId);
  const {
    name, description, address, type, bedrooms, bathrooms,
    regularPrice, discountPrice, offer, parking, furnished
  } = req.body;
  
  const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
  
  try {
    const newListing = new Listing({
      userRef: userId,
      name,
      description,
      address,
      type,
      bedrooms,
      bathrooms,
      regularPrice,
      discountPrice,
      offer,
      parking,
      furnished,
      imageUrls
    });

    await newListing.save();
    res.status(200).json(newListing);
  } catch (err) {
    console.error("Error creating listing:", err);
    res.status(500).json("Server error while creating listing");
  }
};

//get user listing -need authorization
exports.userListingController = async(req,res)=>{
  console.log("inside userListingController");
  const userId = req.userId
  try {
    const allUserListing = await Listing.find({userRef: userId})
    res.status(200).json(allUserListing)
  } catch (err) {
    res.status(401).json(err)  

  }
  
}

exports.deleteListingController = async (req, res) => {
  const listingId = req.params.id;
  const userId = req.userId; // from jwtMiddleware

  try {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json("Listing not found");
    }

    if (listing.userRef.toString() !== userId) {
      return res.status(403).json("You are not authorized to delete this listing");
    }

    await listing.deleteOne();
    res.status(200).json("Listing deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error deleting listing");
  }
};
// Get a specific listing by ID
exports.getListingByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(listing);
  } catch (err) {
    console.error("Error fetching listing:", err);
    res.status(500).json({ message: "Error fetching listing" });
  }
};
//edit listingg
// Edit listing controller
exports.updateListingController = async (req, res) => {
  const listingId = req.params.id;
  const userId = req.userId; // From JWT middleware

  const {
    name, description, address, type, bedrooms, bathrooms,
    regularPrice, discountPrice, offer, parking, furnished
  } = req.body;

  const uploadImages = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

  try {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.userRef.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update the listing fields
    listing.name = name;
    listing.description = description;
    listing.address = address;
    listing.type = type;
    listing.bedrooms = bedrooms;
    listing.bathrooms = bathrooms;
    listing.regularPrice = regularPrice;
    listing.discountPrice = discountPrice;
    listing.offer = offer;
    listing.parking = parking;
    listing.furnished = furnished;
    if (uploadImages.length > 0) {
      listing.imageUrls = uploadImages; // Update images if provided
    }

    const updatedListing = await listing.save(); // Save the updated listing

    res.status(200).json(updatedListing);
  } catch (err) {
    console.error("Error updating listing:", err);
    res.status(500).json({ message: "Error updating listing" });
  }
};

// Get all listings (with optional filters)
// exports.getAllListingsController = async (req, res) => {
//   try {
//     const {
//       searchTerm,
//       type,
//       parking,
//       furnished,
//       offer,
//       sort = 'createdAt',
//       order = 'desc',
//     } = req.query;

//     const queryObject = {};

//     if (searchTerm) {
//       queryObject.name = { $regex: searchTerm, $options: 'i' };
//     }

//     if (type && type !== 'all') {
//       queryObject.type = type;
//     }

//     if (parking === 'true') {
//       queryObject.parking = true;
//     }

//     if (furnished === 'true') {
//       queryObject.furnished = true;
//     }

//     if (offer === 'true') {
//       queryObject.offer = true;
//     }

//     const sortOption = {};
//     sortOption[sort] = order === 'desc' ? -1 : 1;

//     const listings = await Listing.find(queryObject).sort(sortOption);

//     res.status(200).json(listings);
//   } catch (err) {
//     console.error("Error fetching listings:", err);
//     res.status(500).json({ message: "Error fetching listings" });
//   }
// };






