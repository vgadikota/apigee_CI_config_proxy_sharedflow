/* jslint node: true */
'use strict';

module.exports = function() {
  this.When(/^I request an existing API resource$/, function (callback) {
     this.apickli.get('/', callback);
   });

  // this.When(/^I request an existing API resource$/, {timeout: 60 * 1000}, function (callback) {
  //     this.apickli.get('/', callback);
  //  });
   //
   // this.Then(/^response body should be "([^"]*)"$/, function (responseBody, callback) {
   //    var assertion = this.apickli.assertResponseBodyContainsExpression(responseBody);
   //
   // 		// console.log(assertion);
   //
   // 		if (assertion.success) {
   // 				callback();
   // 		} else {
   // 				callback(assertion);
   // 		}
   // });
};
