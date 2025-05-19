import { useEffect, useState } from 'react';
import { userListingAPI } from '../services/allAPI';
import ListingItem from '../components/ListingItem';
import { useLocation } from 'react-router-dom';

export default function Search() {
  const [originalListings, setOriginalListings] = useState([]);
  const [listings, setListings] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });
  const location = useLocation();

useEffect(() => {
  const fetchListings = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await userListingAPI(reqHeader);
        if (result.status === 200) {
          const data = result.data;
          setOriginalListings(data);

          // Check for query param
          const params = new URLSearchParams(location.search);
          const term = params.get('term');

          if (term) {
            // Set term and immediately apply filter
            const filtered = data.filter((item) =>
              item.name.toLowerCase().includes(term.toLowerCase()) ||
              item.description?.toLowerCase().includes(term.toLowerCase())
            );
            setListings(filtered);
            setSidebardata((prev) => ({
              ...prev,
              searchTerm: term,
            }));
          } else {
            setListings(data); // default set
          }
        } else {
          console.error("Failed to fetch listings");
        }
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    }
  };

  fetchListings();
}, [location.search]);
 


  useEffect(() => {
    const fetchListings = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`
        };
        try {
          const result = await userListingAPI(reqHeader);
          if (result.status === 200) {
            setOriginalListings(result.data);
            setListings(result.data); // initial set
          
          } else {
            console.error("Failed to fetch listings");
          }
        } catch (err) {
          console.error("Error fetching listings:", err);
        }
      }
    };

    fetchListings();
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setSidebardata((prev) => ({
        ...prev,
        sort,
        order,
      }));
    } else if (['rent', 'sale', 'all'].includes(value)) {
      setSidebardata((prev) => ({
        ...prev,
        type: value,
      }));
    } else {
      setSidebardata((prev) => ({
        ...prev,
        [id]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let filtered = [...originalListings];

  const typeMapping = {
    rent: 'rent',
    sale: 'sell', // map frontend "sale" to backend "sell"
  };

    // Search Term
    if (sidebardata.searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(sidebardata.searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (sidebardata.type !== 'all') {
    filtered = filtered.filter((item) => {
      const itemType = item.type?.toLowerCase().trim();
      const selectedMappedType = typeMapping[sidebardata.type.toLowerCase().trim()];
      return itemType === selectedMappedType;
    });
  }

    // Offer filter
    if (sidebardata.offer) {
      filtered = filtered.filter((item) => item.offer === true);
    }

    // Parking filter
    if (sidebardata.parking) {
      filtered = filtered.filter((item) => item.parking === true);
    }

    // Furnished filter
    if (sidebardata.furnished) {
      filtered = filtered.filter((item) => item.furnished === true);
    }

    // Sorting
    filtered.sort((a, b) => {
      const sortField = sidebardata.sort;
      const isAsc = sidebardata.order === 'asc';

      if (sortField === 'createdAt' || sortField === 'created_at') {
        const aTime = new Date(a.createdAt || a.created_at).getTime();
        const bTime = new Date(b.createdAt || b.created_at).getTime();
        return isAsc ? aTime - bTime : bTime - aTime;
      } else {
        const aVal = a[sortField];
        const bVal = b[sortField];
        return isAsc ? aVal - bVal : bVal - aVal;
      }
    });

    setListings(filtered);
    setVisibleCount(9);
  };

  return (
    <div  className="container-fluid px-0" style={{backgroundColor: 'rgba(165, 172, 172, 0.678)', marginTop: '-5px',
        height: 'auto',
        padding: '30px 0'}}>
      <div className="container-fluid px-4 py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-12 col-md-4 col-lg-3 border-end mb-4 mb-md-0">
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
              {/* Search Term */}
              <div className="d-flex flex-column gap-2">
                <label className="fw-semibold">Search Term:</label>
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="Search..."
                  className="form-control"
                  value={sidebardata.searchTerm}
                  onChange={handleChange}
                />
              </div>
  
              {/* Type */}
              <div className="d-flex flex-column gap-2">
                <label className="fw-semibold">Type:</label>
                <div className="d-flex gap-3">
                  {['all', 'rent', 'sale'].map((type) => (
                    <div className="form-check" key={type}>
                      <input
                        className="form-check-input"
                        type="radio"
                        value={type}
                        name="type"
                        checked={sidebardata.type === type}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Offer */}
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="form-check-input"
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <label className="form-check-label fw-semibold mb-0" htmlFor="offer">
                  Offer
                </label>
              </div>
  
              {/* Amenities */}
              <div className="d-flex flex-column gap-2">
                <label className="fw-semibold">Amenities:</label>
                <div className="d-flex gap-3 flex-wrap">
                  {['parking', 'furnished'].map((amenity) => (
                    <div className="form-check" key={amenity}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={amenity}
                        checked={sidebardata[amenity]}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={amenity}>
                        {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Sort */}
              <div className="d-flex flex-column gap-2">
                <label className="fw-semibold">Sort:</label>
                <select
                  onChange={handleChange}
                  defaultValue="created_at_desc"
                  id="sort_order"
                  className="form-select"
                >
                  <option value="regularPrice_desc">Price high to low</option>
                  <option value="regularPrice_asc">Price low to high</option>
                  <option value="createdAt_desc">Latest</option>
                  <option value="createdAt_asc">Oldest</option>
                </select>
              </div>
  
              <button type="submit" className="btn btn-dark text-uppercase mt-2">
                Search
              </button>
            </form>
          </div>
  
          {/* Listings */}
          <div className="col-12 col-md-8 col-lg-9">
            <h1 className="h4 fw-semibold border-bottom pb-2 mb-4 text-primary">
              Listing Results:
            </h1>
            <div className="row g-4">
              {listings.length > 0 ? (
                  listings.slice(0, visibleCount).map((listing) => (
                    <div className="col-12 col-sm-6 col-lg-4" key={listing._id}>
                      <ListingItem listing={listing} />
                    </div>
                  ))
                ) : (
                  <p>No listings found.</p>
                )}
            </div>
           <div className="text-center mt-4 d-flex justify-content-center gap-3">
                {visibleCount < listings.length && (
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setVisibleCount((prev) => prev + 9)}
                  >
                    Show More
                  </button>
                )}
  
                  {visibleCount > 9 && (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setVisibleCount(9)}
                    >
                      Show Less
                    </button>
                  )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
