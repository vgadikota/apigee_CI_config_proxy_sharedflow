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


# Demo Guide
1. proxies/pom.xml - will have list of proxies that needs to be deployed 
2. payment-v2 : Which does charge, status & ping operations on provided credit card. For backend I am using Apimocker proxy.
3. Download payment-v2 from this repo , zip "payment-v2/apiproxy" folder & deploy to test env or create an sample API Proxy.
4. Clone/Fork this repo & Create a directory structure as per proxies/payment-v2 directory & place your apiproxy folder.
5. I have manually copy-pasted my Jenkinsfile Script in my Pipeline Job.
6. Trigger Build Manually. 
7. Apigee Lint will go through the apiproxy folder,
![alt text](https://user-images.githubusercontent.com/28925814/40007499-98bd6dfe-57ba-11e8-8d95-ba09a6000039.jpg)

8. Build & Deploy happens through Apigee Maven Plugin(update pom files with appropiate details),

mvn -f /proxies/pom.xml install -Pprod -Dusername=<email_here> -Dpassword=<password_here>
![alt text](https://user-images.githubusercontent.com/28925814/40007503-9ba8be74-57ba-11e8-921f-b556a4048c77.jpg)

9. Integration tests happen through Apickli - Cucumber - Gherkin Tests,

cucumber-js --format json:reports.json features/status.feature

10. Cucumber Reports plugin in Jenkins will use the reports.json file to create HTML Reports & satistics. 
![alt text](https://user-images.githubusercontent.com/28925814/40005985-e5518528-57b6-11e8-85e8-2327449d84a6.jpg)

11. If Integration tests fail, then through a undeploy.sh shell script undeploy current deployed versions

curl -X DELETE --header "Authorization: Basic <base64 username:password>" "https://api.enterprise.apigee.com/v1/organizations/$org_name/environments/$env_name/apis/$api_name/revisions/$rev_num/deployments"
curl -X DELETE --header "Authorization: Basic <base64 username:password>" "https://api.enterprise.apigee.com/v1/organizations/$org_name/apis/$api_name/revisions/$rev_num"
curl -X POST --header "Content-Type: application/x-www-form-urlencoded" --header "Authorization: Basic <base64 username:password>" "https://api.enterprise.apigee.com/v1/organizations/$org_name/environments/$env_name/apis/$api_name/revisions/$pre_rev/deployments"
