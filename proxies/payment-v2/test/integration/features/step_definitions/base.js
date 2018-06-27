/* jslint node: true */
'use strict';

module.exports = function() {
  this.When(/^I request an existing API resource (.*)$/, function (resource,callback) {
     this.apickli.get(resource, callback);
   });
  
  
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
