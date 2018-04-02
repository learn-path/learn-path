[![Build Status](https://travis-ci.org/learn-path/learn-path.svg?branch=master)](https://travis-ci.org/learn-path/learn-path) [![Coverage Status](https://coveralls.io/repos/github/learn-path/learn-path/badge.svg?branch=master)](https://coveralls.io/github/learn-path/learn-path?branch=master)

# Learn Path

Curated and community driven list of learning resources

![Alt text](mockup/Home.png?raw=true "Home") ![Alt text](mockup/PathDetail.png?raw=true "PathDetail")
![Alt text](mockup/SearchList.png?raw=true "Searh List")

#### Install and running locally

1.  clone the project repository
2.  npm install
3.  npm start

#### Deploy

This project utilizes CI/CD, when code is pushed to any branch Travis CI will get the changes and execute the project tests. If the tests pass and the code was in the master branch it will deploy the new version to our domain
https://learnpath.me
The project uses coveralls to receive reports regarding the testing coverage.
