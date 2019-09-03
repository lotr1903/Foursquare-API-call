import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/header';
import Main from './components/main';

// Hiding the relevant information little bit. Not a real solution but this can be
// extend further to .env file and ignore in gitognore to make it more safer.
import * as appSecrets from './app_secrets';

const { CLIENT_SECRET, CLIENT_ID, FSVERSION, API_SEARCH_URL } = appSecrets;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			venues: [],
			searchRadius: '1000',
			searchIntent: 'trending',
			error: '',
			loading: false,
			location: ''
		};
		this.getUserLocation = this.getUserLocation.bind(this);
		this.getVenues = this.getVenues.bind(this);
		this.handleOnSelectValueChange = this.handleOnSelectValueChange.bind(
			this
		);
	}

	getUserLocation() {
		this.setState({ loading: true });

		const success = position => {
			const latitude = position.coords.latitude.toFixed(4);
			const longitude = position.coords.longitude.toFixed(4);

			const location = `${latitude},${longitude}`;

			this.getVenues(location);
		};
		const error = () => {
			this.setState({
				error:
					"We can't locate your location. Please check your location permission in browser.",
				loading: false
			});
		};

		if (!navigator.geolocation) {
			this.setState({
				error: 'Geolocation is not supported by your browser.'
			});
		} else {
			navigator.geolocation.getCurrentPosition(success, error);
		}
	}

	getVenues = async location => {
		try {
			const { searchRadius, searchIntent } = this.state;
			const response = await axios.get(
				`${API_SEARCH_URL}?client_secret=${CLIENT_SECRET}&client_id=${CLIENT_ID}&v=${FSVERSION}&ll=${location}&radius=${searchRadius}&intent=${searchIntent}&sortByDistance=1`
			);
			let results = [];

			if (
				response &&
				response.data &&
				response.data.response &&
				response.data.response.groups[0] &&
				response.data.response.groups[0].items
			) {
				results = await response.data.response.groups[0].items;
			}

			this.setState({
				venues: results,
				loading: false,
				location: response.data.response.headerFullLocation
			});
		} catch (error) {
			this.setState({ error, loading: false });
		}
	};

	handleOnSelectValueChange(event) {
		this.setState({ [event.target.name]: event.target.value });

		this.getUserLocation();
	}

	render() {
		const {
			error,
			searchRadius,
			searchIntent,
			loading,
			venues,
			location
		} = this.state;

		return (
			<div className="wrapper">
				<Header
					onSelectValueChange={this.handleOnSelectValueChange}
					searchIntent={searchIntent}
					searchRadius={searchRadius}
					getUserLocation={this.getUserLocation}
					venues={venues}
					location={location}
				/>
				{loading && <div className="spinner" />}
				<Main venues={venues} location={location} error={error} />
			</div>
		);
	}
}

export default App;
