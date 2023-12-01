const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: "e838dd064de0e78c5c39bcbb23aeb758353944ca",
        options: {
            'sonar.projectName': 'ecommerce-app',
            'sonar.projectDescription': 'Here I can add a description of my project',
            'sonar.projectKey': 'ecommerce-app',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
        }
    },
    () => process.exit()
)
