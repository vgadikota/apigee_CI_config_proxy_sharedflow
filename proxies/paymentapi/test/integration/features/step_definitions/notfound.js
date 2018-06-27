/* jslint node: true */
'use strict';

module.exports = function() {

	this.When(/^I request a non-existing API resource$/, {timeout: 60 * 1000}, function(callback) {
		this.apickli.get('/blah', callback);
	});

	// this.Then(/^response code should be (.*)$/, function(responseCode, callback) {
  //     var assertion = this.apickli.assertResponseCode(responseCode);
  //
	// 		// console.log(assertion);
  //
	// 		if (assertion.success) {
	//         callback();
	//     } else {
	//         callback(assertion);
	//     }
  // });
  //
	// this.Then(/^response body should contain "([^"]*)"$/, function (responseBody, callback) {
  //
	// 	var assertion = this.apickli.assertResponseBodyContainsExpression(responseBody);
  //
	// 	// console.log(assertion);
  //
	// 	if (assertion.success) {
	// 			callback();
	// 	} else {
	// 			callback(assertion);
	// 	}
	//  });

};
