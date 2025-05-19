import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import SERVER_URL from '../services/serverUrl';

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-sm hover-shadow rounded overflow-hidden w-100" style={{ maxWidth: '330px' }}>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={`${SERVER_URL}${listing.imageUrls[0]}`}
          alt={listing.name}
          className="w-100 object-fit-cover"
          style={{ height: '220px', transition: 'transform 0.3s' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div className="p-3 d-flex flex-column gap-2 w-100">
          <p className="text-truncate fs-5 fw-semibold text-dark mb-1">
            {listing.name}
          </p>

          <div className="d-flex align-items-center gap-1">
            <MdLocationOn className="text-success" style={{ width: '16px', height: '16px' }} />
            <p className="text-muted small text-truncate mb-0">
              {listing.address}
            </p>
          </div>

          <p className="text-muted small mb-0">
            {listing.description}
          </p>

          <p className="text-secondary mt-2 fw-semibold mb-0">
              ${listing.offer && listing.discountPrice != null ? listing.discountPrice : listing.regularPrice ?? 'N/A'}
              {listing.type === 'rent' ? " / month" : ""}
          </p>


          <div className="text-dark d-flex gap-3">
            <div className="fw-bold small">{listing.bedrooms} beds</div>
            <div className="fw-bold small">{listing.bathrooms} baths</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
