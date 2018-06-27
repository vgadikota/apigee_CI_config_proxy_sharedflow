Feature: Resource  found
	As an API consumer
	I want to be informed when I request status
	So I can learn the API availability

	Scenario: I should get a positive response when I request status
		When I request an existing API resource status
		Then response code should be 200
