import React, {Component} from "react";
import {gql} from 'apollo-boost';
import {graphql} from "react-apollo";

const getBooksQuery = gql`
 {
    books {
        name
        id
    }
 }
`;

class BookList extends Component{

    getAllBooks() {
       const data = this.props.data;
       if(data.loading) {
           return (<div>Loading books... </div>)
       } else {
           return data.books.map(book => (
               <li key={book.id}>{book.name}</li>
           ));
       }
    }

    render() {
        return (
            <ul>
                {this.getAllBooks()}
            </ul>
        )
    }
}

export default graphql(getBooksQuery)(BookList);