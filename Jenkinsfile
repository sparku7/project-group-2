pipeline {
   agent any
   stages {
       stage('Install') {
           steps {

           bat npm Install

           }
       }
    //    stage('Delete') {
    //        steps {

    //        }
    //    }
       stage('Run') {
           steps {

            pm2 start "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js" -- start
           }
       }
   }
}