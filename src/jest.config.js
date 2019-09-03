module.exports = {
	clearMocks: true,
	testEnviroment: 'jsdom',
	setupFile: ['<rootDir>/setupTests.js'],
	testURL: 'http://localhost/',
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 50,
			statements: 50
		}
	}
};
