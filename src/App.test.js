import { shallow } from 'enzyme';
import React from 'react';
import App from './App';

describe('App', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<App />);
	});

	it('should render App correctly ', () => {
		expect(wrapper.find('Header')).toHaveLength(1);
		expect(wrapper.find('Main')).toHaveLength(1);
	});
});
