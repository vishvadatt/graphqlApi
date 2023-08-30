const {gql} = require('apollo-server-express');
const movies = require('./movieSchema');

const typeDefs = gql `
    type Movie {
        id : ID
        name : String
        producer : String
        rating : Float
    }

    type Query {
        getMovies(name : String) : [Movie]
        findOneMovie(id : String) : Movie
    }

    input userInput {
        name : String
        producer : String
        rating : Float
    }

    type Mutation {
        addMovie(name : String,producer : String,rating : Float) : Movie
        updateMovie(id : ID,input : userInput) : Movie
        deleteMovie(id : ID) : Movie
    }
`;

const resolvers = {
    Query : {
        async getMovies (parent, args) {
            console.log("args...",args);
            let qry = {}
            if(args.name){
                qry['name'] = args.name
            }
            console.log("qry..",qry);
            return await movies.find(qry);
        },

        async findOneMovie(parent,args){
            console.log("args..",args.id);
            return await movies.findOne({_id : args.id})
        }
    },

    Mutation : {
        async addMovie (parent, args) {
            try {
                return await movies.create(args);
            } catch (e) {
                console.log("e..",e);
            }
        },

        async updateMovie(parent,{id,input}){
            try {
                console.log("id...",id,input);
                return await movies.findByIdAndUpdate({_id : id},input,{new : true});
            } catch (e) {
                console.log("e.",e);
            }
        },

        async deleteMovie(parent,{id}){
            try {
                return await movies.deleteOne({_id : id})
            } catch (e) {
                console.log("e..",e);
            }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}