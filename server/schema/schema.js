const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];


const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
       id: {type: GraphQLID},
       name: {type: GraphQLString},
       genre: {type: GraphQLString},
       author: {
           type: AuthorType,
           resolve(parent, args) {
               return undefined;
           }
       }
   })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
       book: {
           type: BookType,
           args: {id: {type: GraphQLID}},
           resolve(parent, args){
               return books.filter(book => book.id == args.id);
           }
       },
       author: {
           type: AuthorType,
           args: {id: {type: GraphQLID}},
           resolve(parent, args) {
               return books.filter(book => book.id == args.id);
           }
       }
   }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});