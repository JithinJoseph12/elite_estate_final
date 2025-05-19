import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateListingAPI, getListingByIdAPI } from '../services/allAPI';
import SERVER_URL from '../services/serverUrl';

const UpdateListing = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
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

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const result = await getListingByIdAPI(listingId, headers);
        if (result.status === 200) {
          const updatedImageUrls = result.data.imageUrls.map(url =>
            url.startsWith('http') ? url : `${SERVER_URL}${url}`
          );
          setFormData({ ...result.data, imageUrls: updatedImageUrls });
        } else {
          alert('Failed to load listing data');
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong while fetching listing data');
      }
    };

    if (listingId) fetchListingData();
  }, [listingId]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUploadImages = () => {
    const newUrls = [...files].map(file => URL.createObjectURL(file));
    setFormData(prevFormData => ({
      ...prevFormData,
      imageUrls: [...prevFormData.imageUrls, ...newUrls],
    }));
  };

  const handleUpdateListing = async (e) => {
    e.preventDefault();

    const {
      name, description, address, type, bedrooms, bathrooms,
      regularPrice, discountPrice, offer, parking, furnished
    } = formData;

    if (name && description && address && type && bedrooms && bathrooms && regularPrice ) {
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
          const result = await updateListingAPI(listingId, reqBody, reqHeaders);
          if (result.status === 200) {
            alert("Listing updated successfully");
            navigate("/profile");
          } else {
            alert(result.response?.data || "Update failed");
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
    <main className="container py-4">
      <h1 className="text-center mb-4 display-6 fw-semibold">Update a Listing</h1>
      <form className="row g-4" onSubmit={handleUpdateListing}>
        {/* Left Section */}
        <div className="col-md-6">
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="form-control"
          />
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="form-control mt-3"
          />
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="form-control mt-3"
          />

          <div className="d-flex flex-wrap gap-3 mt-3">
            {[
              { label: "Sell", id: "type", value: "sell" },
              { label: "Rent", id: "type", value: "rent" },
              { label: "Parking", id: "parking" },
              { label: "Furnished", id: "furnished" },
              { label: "Offer", id: "offer" },
            ].map(({ label, id, value }, index) => (
              <div className="form-check" key={index}>
                <input
                  type={id === 'type' ? "radio" : "checkbox"}
                  id={id}
                  value={value || undefined}
                  checked={id === 'type' ? formData.type === value : formData[id]}
                  onChange={handleChange}
                  className="form-check-input"
                  name={id === 'type' ? "type-options" : id}
                />
                <label className="form-check-label">{label}</label>
              </div>
            ))}
          </div>

          <div className="row mt-3">
            {[
              { label: "Beds", id: "bedrooms" },
              { label: "Baths", id: "bathrooms" },
              { label: "Regular Price", id: "regularPrice" },
              { label: "Discount Price", id: "discountPrice" },
            ].map(({ label, id }) => (
              <div className="col-6 mb-3" key={id}>
                <label className="form-label">{label}</label>
                <input
                  type="number"
                  id={id}
                  value={formData[id]}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6">
          <div className="mb-2 fw-semibold">
            Images:
            <span className="text-muted ms-2">The first image will be the cover (max 6)</span>
          </div>

          {formData.imageUrls.length > 0 && (
            <div className="row g-2 mb-3">
              {formData.imageUrls.map((url, index) => (
                <div className="col-6" key={index}>
                  <img
                    src={url}
                    alt={`listing-${index}`}
                    className="img-fluid rounded"
                    style={{ height: '160px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="d-flex gap-2 mb-3">
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
              className="btn btn-outline-success text-uppercase"
            >
              Upload
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary text-uppercase w-100"
          >
            Update Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
