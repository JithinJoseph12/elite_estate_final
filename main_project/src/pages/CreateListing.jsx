import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListingAPI } from '../services/allAPI';

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUploadImages = () => {
    const urls = [...files].map(file => URL.createObjectURL(file));
    setFormData({ ...formData, imageUrls: urls }); // preview only
  };

  const handleAddListing = async (e) => {
    e.preventDefault();

    const {
      name, description, address, type, bedrooms, bathrooms,
      regularPrice, discountPrice, offer, parking, furnished
    } = formData;

    if (name && description && address && type && bedrooms && bathrooms && regularPrice && files.length) {
      const reqBody = new FormData();

      reqBody.append("name", name);
      reqBody.append("description", description);
      reqBody.append("address", address);
      reqBody.append("type", type);
      reqBody.append("bedrooms", bedrooms);
      reqBody.append("bathrooms", bathrooms);
      reqBody.append("regularPrice", regularPrice);
      reqBody.append("discountPrice", discountPrice);
      reqBody.append("offer", offer);
      reqBody.append("parking", parking);
      reqBody.append("furnished", furnished);

      [...files].forEach(file => reqBody.append("imageUrls", file));

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeaders = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        };

        try {
          const result = await createListingAPI(reqBody, reqHeaders);
          if (result.status === 200) {
            alert("Listing added successfully");
            const createdListingId = result.data._id;
            navigate(`/listing/${createdListingId}`);
          } else {
            alert(result.response.data);
          }
        } catch (err) {
          console.error(err);
          alert("Something went wrong");
        }
      }
    } else {
      alert("Please fill all required fields");
    }
  };

  return (
    <div className="container-fluid px-0" style={{backgroundColor: 'rgba(165, 172, 172, 0.678)', marginTop: '-5px',
        height: 'auto',
        padding: '30px 0'}}>
      <div className="container my-5">
        <h2 className="text-center mb-4">Create a Listing</h2>
        <form onSubmit={handleAddListing}>
          <div className="row">
            {/* Left Section */}
            <div className="col-md-6 mb-4">
              <div className="mb-3">
                <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Name" className="form-control form-control-lg" />
              </div>
              <div className="mb-3">
                <textarea id="description" value={formData.description} onChange={handleChange} placeholder="Description" className="form-control form-control-lg" />
              </div>
              <div className="mb-3">
                <input type="text" id="address" value={formData.address} onChange={handleChange} placeholder="Address" className="form-control form-control-lg" />
              </div>
  
              <div className="mb-3">
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="type" id="type" value="sell" checked={formData.type === "sell"} onChange={handleChange} />
                  <label className="form-check-label">Sell</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="type" id="type" value="rent" checked={formData.type === "rent"} onChange={handleChange} />
                  <label className="form-check-label">Rent</label>
                </div>
              </div>
  
              <div className="mb-3">
                {["parking", "furnished", "offer"].map((field, idx) => (
                  <div className="form-check form-check-inline" key={idx}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={field}
                      checked={formData[field]}
                      onChange={handleChange}
                    />
                    <label className="form-check-label text-capitalize" htmlFor={field}>{field}</label>
                  </div>
                ))}
              </div>
  
              <div className="row">
                {[
                  { id: "bedrooms", label: "Bedrooms" },
                  { id: "bathrooms", label: "Bathrooms" },
                  { id: "regularPrice", label: "Regular Price" },
                  { id: "discountPrice", label: "Discount Price" },
                ].map(({ id, label }) => (
                  <div className="col-6 mb-3" key={id}>
                    <label className="form-label">{label}</label>
                    <input type="number" id={id} value={formData[id]} onChange={handleChange} className="form-control" />
                  </div>
                ))}
              </div>
            </div>
  
            {/* Right Section */}
            <div className="col-md-6 mb-4">
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Images <small className="text-muted">(First image will be cover, max 6)</small>
                </label>
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className="form-control"
                  type="file"
                  accept="image/*"
                  multiple
                />
                <button
                  type="button"
                  onClick={handleUploadImages}
                  className="btn btn-outline-success mt-2"
                >
                  Upload
                </button>
              </div>
  
              <button type="submit" className="btn btn-primary btn-lg w-100 mt-4">
                Create Listing
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
