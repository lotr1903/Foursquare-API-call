import React from 'react';
import { object, arrayOf } from 'prop-types';

const VenueList = props => {
	const { venues } = props;

	const venueList = venues.map((e, i) => (
		<li key={e.venue.id} className="venue__list-item">
			<div>
				<div className="venue__image">
					{e.photo ? (
						<img
							src={`${e.photo.prefix}100x100${e.photo.suffix}`}
							alt={`${e.venue.name}`}
						/>
					) : (
						<img
							src={`${e.venue.categories[0].icon.prefix}512.png`}
							alt={`${e.venue.name}`}
						/>
					)}
				</div>
				<div className="venue__details">
					<a
						className="venue__name"
						href={`https://tr.foursquare.com/v/${e.venue.name}/${e.venue.id}`}
						target="_blank"
						rel="noreferrer noopener"
						title={e.venue.name}
					>
						{e.venue.name}
					</a>
					<h3 className="venue_category">
						{e.venue.categories[0].shortName}
					</h3>
					<div className="venue__address">
						{e.venue.location.address
							? `${e.venue.location.address} - ${e.venue.location.distance}m`
							: 'Address not found.'}
					</div>
				</div>
				<div className="venue__map-link">
					<a
						className="venue__name"
						href={`https://www.google.com/maps/place/${e.venue.location.lat},${e.venue.location.lng}`}
						target="_blank"
						rel="noreferrer noopener"
						title="Google Map Link of Venue"
					>
						Show venue on Google Maps
					</a>
				</div>
			</div>
		</li>
	));

	return <ul>{venueList}</ul>;
};

VenueList.defaultProps = {
	venues: []
};

VenueList.propTypes = {
	venues: arrayOf(object)
};

export default VenueList;
