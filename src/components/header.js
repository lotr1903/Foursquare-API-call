import React, { Component } from 'react';
import { string, arrayOf, object } from 'prop-types';

class Header extends Component {
	constructor(props) {
		super(props);
		this.handleSelectValueChange = this.handleSelectValueChange.bind(this);
	}

	handleSelectValueChange(event) {
		this.props.onSelectValueChange(event);
	}

	render() {
		const { searchIntent, searchRadius, venues, location } = this.props;
		return (
			<header className="header">
				<div className="header__text">
					<p>Check venue recommendations around you.</p>
				</div>
				<div className="header__interactions">
					<button
						className="header__button"
						type="button"
						onClick={this.props.getUserLocation}
						aria-label="Get Venue Button"
					>
						Show places near me
					</button>
					{(venues.length > 0 || location) && (
						<>
							<select
								className="header__select"
								onChange={this.handleSelectValueChange}
								value={searchRadius}
								name="searchRadius"
							>
								<option value="100">100 m</option>
								<option value="500">500 m</option>
								<option value="1000">1000 m</option>
								<option value="2500">2500 m</option>
								<option value="5000">5000 m</option>
							</select>
							<select
								className="header__select"
								onChange={this.handleSelectValueChange}
								value={searchIntent}
								name="searchIntent"
							>
								<option value="trending">trending</option>
								<option value="food">food</option>
								<option value="drinks">drinks</option>
								<option value="coffee">coffee</option>
								<option value="shops">shops</option>
								<option value="outdoors">outdoors</option>
								<option value="sights">sights</option>
								<option value="nextVenues">nextVenues</option>
							</select>
						</>
					)}
				</div>
			</header>
		);
	}
}

Header.defaultProps = {
	venues: [],
	searchIntent: 'Trending',
	searchRadius: '1000',
	location: ''
};

Header.propTypes = {
	venues: arrayOf(object),
	searchIntent: string,
	searchRadius: string,
	location: string
};

export default Header;
