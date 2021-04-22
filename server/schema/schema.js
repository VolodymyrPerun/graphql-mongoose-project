const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const Movies = require('../models/movies');
const Directors = require('../models/directors');

const movies = [
    {id: '1', name: 'Batman', genre: 'Fantastic-Action', directorId: '1'},
    {id: 2, name: 'Snatch', genre: 'Crime-Comedy', directorId: 2},
    {id: 3, name: 'Snatch2', genre: 'Crime-Comedy', directorId: 2},
    {id: '4', name: 'Batman2', genre: 'Fantastic-Action', directorId: '1'},
];

const directors = [
    {id: '1', name: 'Quentin Tarantino', age: 55},
    {id: 2, name: 'Guy Ritchie', age: 50}
];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent, arg) {
                //return directors.find(director => director.id == parent.id);
                return Directors.findById(parent.directorId);
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
               // return movies.filter(movie => movie.directorId === parent.id);
                return Movies.find({directorId: parent.id});
            },
        },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
               // return movies.find(movie => movie.id == args.id);
                return Movies.findById(args.id);
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
               // return directors.find(director => director.id == args.id);
                return Directors.findById(args.id);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
               // return movies;
                return Movies.find({});
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
               // return directors;
                return Directors.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query
});

