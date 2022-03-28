const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { importSchema } = require('graphql-import');

const PORT = 4000;

// Initialize a GraphQL schema
const schema = buildSchema(importSchema('schema.graphql'));

const users = [
    {
        id: 1,
        name: 'Brian',
        age: '21',
        shark: 'Great White Shark'
    },
    {
        id: 2,
        name: 'Kim',
        age: '22',
        shark: 'Whale Shark'
    },
    {
        id: 3,
        name: 'Faith',
        age: '23',
        shark: 'Hammerhead Shark'
    },
    {
        id: 4,
        name: 'Joseph',
        age: '23',
        shark: 'Tiger Shark'
    },
    {
        id: 5,
        name: 'Joy',
        age: '25',
        shark: 'Hammerhead Shark'
    }
];
  
// Return a single user
const getUser = function(args) {
    var userID = args.id;
    return users.filter(user => user.id == userID)[0];
}

  // Return a list of users
const retrieveUsers = function(args) {
    if (args.shark) {
        const shark = args.shark;
        return users.filter(user => user.shark === shark);
    } else {
        return users;
    }
} 

// Update a user and return new user details
const updateUser = function({id, name, age}) {
    users.map(user => {
        if (user.id === id) {
            user.name = name;
            user.age = age;
            return user;
        }
    });
    return users.filter(user => user.id === id)[0];
};

// Root resolver
const root = { 
    user: getUser,  
    users: retrieveUsers,
    updateUser: updateUser 
};

// Create an express server and a GraphQL endpoint
const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,  // Must be provided
    rootValue: root,
    graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
}));

app.listen(PORT, () => console.log(`Now browse to localhost:${PORT}/graphql`));