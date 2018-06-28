node {
 try {
  
  stage('Preparation') {
   mvnHome = tool 'm3'
  }

try {
  stage('Deploy to Test') {
   // Run the maven build
   sh "'${mvnHome}/bin/mvn' -f /usr/lib/node_modules/npm/apigee-ci-deploy-bdd-lint-master/hr-api/pom.xml install -Pprod -Dusername=<email_here> -Dpassword=<password_here>"
   }
}catch (e) {
   //if tests fail, I have used an shell script which has 3 APIs to undeploy, delete current revision & deploy previous revision
   sh "$WORKSPACE/undeploy.sh"
   throw e
  } finally {
   
  }
  
try {
  stage('Deploy to Production') {
   // Run the maven build
   sh "'${mvnHome}/bin/mvn' -f /usr/lib/node_modules/npm/apigee-ci-deploy-bdd-lint-master/hr-api/pom.xml install -Pprod -Dusername=<email_here> -Dpassword=<password_here>"
  }
  } catch (e) {
   //if tests fail, I have used an shell script which has 3 APIs to undeploy, delete current revision & deploy previous revision
   sh "$WORKSPACE/undeploy.sh"
   throw e
  } finally {
   
  }
 } catch (e) {
  currentBuild.result = 'FAILURE'
  throw e
 } finally {
  
 }
}
