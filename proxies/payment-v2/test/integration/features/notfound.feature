Feature: Resource not found
	As an API consumer
	I want to be informed when I request non-existing resources
	So I can learn the API and fix my errors quickly

	Scenario: I should get an error when I request non-existing resources
		When I request a non-existing API resource
		Then response code should be 404
		# And response body should contain "Not found!"
