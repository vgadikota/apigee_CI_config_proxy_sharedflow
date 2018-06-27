/* jshint node:true */
'use strict';

var apickli = require('apickli');
var config = require('../../test-config.json');

console.log('demo api: [' + config.demoApi.domain + ', ' + config.demoApi.basepath + ']');

module.exports = function() {
	// cleanup before every scenario
	this.Before(function(scenario, callback) {
		this.apickli = new apickli.Apickli('https',
										   config.demoApi.domain + config.demoApi.basepath,
										   './test/integration/features/fixtures/');
		callback();
	});
};
