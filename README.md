# apigee_CI_config_proxy_sharedflow

# Overview

Each proxy source code module is self contained with the actual Apigee Edge proxy, config files for Edge Management API calls (e.g. KVMs, target servers), swagger spec and tests. The key components enabling continuous integration are:

∙ Jenkins - build engine

∙ Maven - builder

∙ Apickli - cucumber extension for RESTful API testing

∙ Cucumber - Behavior Driven Development

∙ Apigeelint - Static code analysis for Apigee proxy bundles

∙ JSLint - Static code analysis for JavaScript Code

Basically, everything that Jenkins does using Maven and other tools can be done locally, either directly with the tool (e.g. jslint, cucumberjs) or via Maven commands.

Jenkins projects are set up to run using Maven and Maven runs via configurations in a pom file (pom.xml). Maven follows a phased approach to execute commands and generally the result of that execution is to create a "target" directory to hold the output ultimately results in loading the proxy into Apigee Edge. Some commonly used commands are:

∙ clean - remove the target directory

∙ copy-resources - copy the source files to the target applying any filtering or replacement

∙ package - copy the source files and bundle into zip file for deployment to Apigee

∙ install - copy, package and install into Apigee

∙ integration - run integration tests

# Introduction
On every pipeline execution, the code goes through the following steps:

1. Develop an API Proxy in test environment Apigee Edge UI, Download the proxy and push to Github.
2. In Jenkins, Apigee Proxy bundle is cloned from Github.
3. Code Analysis is done using Apigee Lint.
4. A new revision is published in prod environment using Apigee Maven Build Plugin.
5. The newly deployed prod environment goes through Integration tests using Apickli.
6. Apickli produced Cucumber Reports are displayed in Jenkins

# Prerequisites
1. Apigee Edge Account
2. NodeJS & NPM
3. Configure Jenkins with Git, Cucumber Reports, JDK, Maven, NodeJS

# Info/Instructions for sharedflows deployment
1. sharedflows/pom.xml - will have list of sharedflows that needs to be deployed
2. authentication : Sharedflow with policies to verify access_token(OAuth)
3. error : Sharedflow with Apigee recommended error handling pattern implementation, to handle all proxy related errors
4. ping : Sharedflow with policies to check the availability of a proxy
5. security : Sharedflow with policies like Spike arrest, Quota, to secure an API proxy from unexpected surge in API usage
6. ThreatProtection : Sharedflow with RegEX, JSON & XML threat protections policies to protect proxy from malicious content
7. undefinedresource : Sharedflow to handle any undefined resource
8. authentication : Sharedflow with policies to verify access_token(OAuth)
9. Clone/Fork this repo & Create a directory structure as per sharedflows directory & place your sharedflow folder inside it.
10. If you are using Jenkins for build and deployment automation  copy-paste Jenkinsfile Script from this repo to your Pipeline Job.
11. If you are trying using maven alone, trigger build manually, with following command

# mvn -f ./sharedflows/pom.xml install -Dorg=<org_name_here> -P<env_name_here> -Dusername=<email_here> -Dpassword=<password_here>

12. The build steps and the options available for building and deploying Shared Flows are the same as API Proxy
13. The only key difference between the API Proxy and the Shared Flow is a new property as part of the profiles.
<apigee.apitype>sharedflow</apigee.apitype>

# please note:
14. Before re-deploying shared flows, from second time onwards, detatch "logging_sharedflow" from flowhook using edgeUI, 
Admin-->Environments-->Flow Hooks

# Info/Instructions for proxies deployment
1. proxies/pom.xml - will have list of proxies that needs to be deployed
2. payment-v2 : Which does charge, status & ping operations on provided credit card.
3. payment-v2-mock :  Mock proxy using Apimocker node module, backend for payment-v2.
3. Download payment-v2 from this repo , zip "payment-v2/apiproxy" folder & deploy to test env or create a sample API Proxy.
4. Clone/Fork this repo & Create a directory structure as per proxies/payment-v2 directory & place your apiproxy folder.
5. If you are using Jenkins for build and deployment automation  copy-paste Jenkinsfile Script from this repo to your Pipeline Job.
6. If you are trying using maven alone, trigger build manually, with following command

# mvn -f ./proxies/pom.xml install -Dorg=<org_name_here> -P<env_name_here> -Dusername=<email_here> -Dpassword=<password_here> -Dapigee.config.options=update

7. Apigee Lint will go through the apiproxy folder,
![alt text](https://user-images.githubusercontent.com/28925814/40007499-98bd6dfe-57ba-11e8-8d95-ba09a6000039.jpg)

8. Build & Deploy happens through Apigee Maven Plugin(update pom files with appropriate details),

![alt text](https://user-images.githubusercontent.com/28925814/40007503-9ba8be74-57ba-11e8-921f-b556a4048c77.jpg)

9. Integration tests happen through Apickli - Cucumber - Gherkin Tests,

cucumber-js --format json:reports.json features/status.feature

10. Cucumber Reports plugin in Jenkins will use the reports.json file to create HTML Reports & satistics.
![alt text](https://user-images.githubusercontent.com/28925814/40005985-e5518528-57b6-11e8-85e8-2327449d84a6.jpg)

11. If Integration tests fail, use a shell script like undeploy.sh to undeploy current deployed versions

curl -X DELETE --header "Authorization: Basic <base64 username:password>" "https://api.enterprise.apigee.com/v1/organizations/$org_name/environments/$env_name/apis/$api_name/revisions/$rev_num/deployments"
curl -X DELETE --header "Authorization: Basic <base64 username:password>" "https://api.enterprise.apigee.com/v1/organizations/$org_name/apis/$api_name/revisions/$rev_num"
curl -X POST --header "Content-Type: application/x-www-form-urlencoded" --header "Authorization: Basic <base64 username:password>" "https://api.enterprise.apigee.com/v1/organizations/$org_name/environments/$env_name/apis/$api_name/revisions/$pre_rev/deployments"

12. If maven build is success, you should see payment-v2 & payment-v1-mock proxies deployed and running in your edge org

13. Curl commands to verify deployments
    i) curl -X GET \
  https://<org_name>-<env_name>.apigee.net/svc/v2/payments/status
  
  ii) curl -X POST \
  https://<org_name>-<env_name>.apigee.net/svc/v2/payments/payment \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 44a1962e-5899-40f5-9ef6-89fffb2f1c83' \
  -H 'cache-control: no-cache' \
  -d '{
  "funding": {
    "creditCard": {
      "cardholderName": "John Smith",
      "expiryDate": {
        "month": "09",
        "year": "20"
      },
      "number": "4111111111111111",
      "securityCode": "444",
      "sequenceNumber": "01",
      "type": "American Express"
    },
    "method": "creditCard"
  }
}'
