#  CFPM

> Code Fellows Package Manger - create your own personal package manager
#### About
Code Fellows Package Manager was created by Joshua Haan and Seth Moore for Code Fellows 401 project. The purpose is to allow users to create a lightweight, private package manager that can be installed on any server/computer.

#### Features

- Files only accessible through CRUD routes: potential for private packages
- Installable through NPM
- Corresponding CLI
- Version control: publish and request specific versions
- Author authorization

#### Installation

Install onto your server with NPM
`npm install cfpm`

Set desired server port and mongodb url as environment variables or by creating a .config.js file in root:
```
module.exports.DB = 'your:uri-goes.here'
module.exports.S_PORT = 3000
```

#### Routes

Using the CLI is recommended, but CFPM can take HTTP requests from custom clients fairly easily.
`npm i -g cfpm-cli`


##### /Login

This route takes authorization header with a username and password and returns a token on the res object if the account exists. For demo purposes, this server does not allow for account creation, but two test accounts are created on startup:
```
{
  userName: 'haanj',
  name: 'Joshua',
  password: 'password123'
}
{
  userName: 'seth',
  name: 'seth',
  password: 'seth'
}
```

#### /projects

##### POST
POST requests to /projects will create a new package, if none exists. Requests must include an authentication token or they will be rejected. Request headers must also include a projectname and version parameters. If the package does not exist, a new package will be created with that version number, and the attached file will be stored on the server.

##### PUT
PUT requests to /projects will update an existing package to a new version. Requests must include an authentication token belonging to the original package author, or they will be rejected. Request headers must also include a projectname and version parameters. If the package exists and the version number is incremental, the package will be updated and the attached file will be stored on the server as the current version of the package.

##### GET
GET requests to /projects will return a stored file corresponding tot he requested package number. GET requests require the request header to include a projectname parameter. A version parameter may optionally be included to return a specific version. If the version parameter is missing or is incorrect, the latest version will be returned as a response.
