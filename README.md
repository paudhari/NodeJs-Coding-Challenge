# Prerequisites
1. [Node JS (v8.x.x)](<https://nodejs.org/en/download/>)
2. [Docker](https://www.docker.com/products/docker)
3. [Redis](https://redis.io/topics/quickstart)

# Starting Application
 Run `docker-compose up` command
#Unit Testing of p2pService
 `cd p2pStorage && npm run test`

# Without docker
1. Start Redis Server.
2. Run command - `cd p2pStorage && npm install && npm start`
3. Run command in new terminal - `cd application && npm install && npm start.`


# Problem Statement
According to me, I had to optimize request and response size and minimize elapsed time while meeting the requirements of the application.

# Solution
I have developed a p2pService and To reduce the size i have optimized request by removing headers and storing the data as simple strings.
Data integrity is ensured by appending checksum to the request which is generated based on data that is being sent and verifying it when data is recieved.
Validation is performed using declarative validation library - validate.js
Data is persisted even after the service is restarted via Redis. It is used to store the data.

#Testing
I have tested the application 2 data files,
corrected-example-data.json - Without validation errors
data.json - A smaller set of data


# Notes
There were few issues in the  code shared:
1. undefined error at TrafficMetricStorage:31 when i ran only p2pService.
2. await was missing in bootstrap:23
