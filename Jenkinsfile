pipeline {
    agent {
        label 'jenkins-slave'
    }
    parameters {
        choice(name: 'VERSION_TYPE', choices: ['DEV', 'MINOR', 'MAJOR', 'HOTFIX'], description: 'Select version type')
    }
    environment {
        versionType = "${VERSION_TYPE}"
        project = "fluent-ffmpeg"
    }
    stages {
        stage('Clean WS') {
            steps {
                deleteDir()
            }
        }
        stage('Git checkout') {
            steps {
                checkout scm
            }
        }
        stage("Evaluate Next Version for develop") {
            when {
                branch 'develop'
            }
            steps {
                script {
                    echo('Evaluating the current and next project version prior to release...')
                    def currentVersionScript = $/eval "cat version | grep 'current_version' | awk -F '=' '{print \$2}' | xargs "/$
                    currentTag = sh(script: "${currentVersionScript}", returnStdout: true).trim()
                    echo("Current tag is ${currentTag}")
                    def currentNonSnapshotVersion = currentTag.replace('-SNAPSHOT', '')
                    def values = currentNonSnapshotVersion.split(/[.]/)
                    echo("Chosen version for build ${versionType}")
                    switch (versionType.toUpperCase()) {
                        case "DEV":
                            nextTag = "${currentTag}-${env.BUILD_NUMBER}"
                            break
                        case "MAJOR":
                            bumpedVersion = values[0].toInteger() + 1
                            nextTag = [bumpedVersion, "0", "0"].join('.')
                            break
                        case "MINOR":
                            bumpedVersion = values[1].toInteger() + 1
                            nextTag = [values[0], bumpedVersion, "0"].join('.')
                            break
                    }
                    echo("Using tag: ${nextTag}")
                    currentBuild.setDisplayName("${project} v${nextTag}")
                }
            }
        }

        stage('Input Stage') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    if (versionType != 'DEV') {
                        def userInput = input(
                                id: 'userInput', message: "Are you sure you want to build ${versionType} with version ${nextTag} ? Current version is ${currentTag}", parameters: [
                                [$class: 'BooleanParameterDefinition', defaultValue: false, description: '', name: "Build ${versionType} with ${nextTag} "]
                        ])
                    }
                }
            }
        }

        stage('Docker Build') {
            when {
                anyOf {
                    branch 'develop'
                    allOf {
                        branch 'master'
                        environment name: 'VERSION_TYPE', value: 'DEV'
                    }
                }
            }
            steps {
              script {
                docker.withRegistry("https://613765377812.dkr.ecr.us-east-1.amazonaws.com", "ecr:us-east-1:storyfile-ecr-aws") {
                  sh("docker build --no-cache -t 613765377812.dkr.ecr.us-east-1.amazonaws.com/${project}:${nextTag} . ")
                  sh("docker tag 613765377812.dkr.ecr.us-east-1.amazonaws.com/${project}:${nextTag} 613765377812.dkr.ecr.us-east-1.amazonaws.com/${project}:latest ")
                  sh("docker push 613765377812.dkr.ecr.us-east-1.amazonaws.com/${project}:${nextTag}")
                  sh("docker push 613765377812.dkr.ecr.us-east-1.amazonaws.com/${project}:latest")
                }
              }
            }
        }
        stage('Tag Repository for DEV') {
            when {
                allOf {
                    branch 'develop'
                    environment name: 'VERSION_TYPE', value: 'DEV'
                }
            }
            steps {
                script {
                    sh "git tag ${nextTag}"
                    sh "git push origin ${nextTag}"
                }
            }
        }
    }
}