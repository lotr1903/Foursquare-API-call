import React, { Component } from 'react';
import classNames from 'classnames';
import { string, arrayOf, object } from 'prop-types';
import VenueList from './venueList';

class Main extends Component {
	constructor(props) {
		super(props);
		this.handleSelectValueChange = this.handleSelectValueChange.bind(this);
		this.myRef = React.createRef();
	}

	handleSelectValueChange(event) {
		this.props.onSelectValueChange(event);
	}

	removeClassfromMainDomElement() {
		const mainDomElement = this.myRef.current;

		if (mainDomElement) {
			mainDomElement.classList.remove('hide');
		}
	}

	render() {
		const { error, searchIntent, venues, location } = this.props;

		return (
			<main
				className={classNames('main', { hide: !location })}
				ref={this.myRef}
			>
				{error && <div className="main__error-text">{error}</div>}
				{venues.length > 0 && (
					<>
						<div className="venue__result-texts">
							<div className="venue_result-text">{`Recommended ${searchIntent} places near ${location}`}</div>
							<div className="venue_result-number">{`Total Places: ${venues.length}`}</div>
						</div>
						<div className="venue__results-list">
							<VenueList venues={venues} />
						</div>
					</>
				)}
				{location && venues.length === 0 && (
					<div className="main__error-text">
						{' '}
						No place found near your location. Try to expand search
						radius or change categories.
					</div>
				)}
			</main>
		);
	}
}

Main.defaultProps = {
	error: '',
	searchIntent: 'Trending',
	venues: [],
	location: ''
};

Main.propTypes = {
	error: string,
	searchIntent: string,
	venues: arrayOf(object),
	location: string
};

export default Main;
