var faker = require('faker');
var Factory = require('rosie').Factory

Factory.define('user')
    .attr('email', () => faker.internet.email())
    .attr('name', () => faker.name.findName())  
    .attr('password', () => faker.random.alphaNumeric(6))

module.exports = Factory.build("user")