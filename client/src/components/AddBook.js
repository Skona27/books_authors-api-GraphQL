import React, {Component} from "react";
import {gql} from 'apollo-boost';
import {graphql} from "react-apollo";

const getAuthorsQuery = gql`
 {
    authors {
        name
        id
    }
 }
`;

class AddBook extends Component{
    getAllAuthors(){
        var data = this.props.data;
        if(data.loading){
            return( <option disabled>Loading authors</option> );
        } else {
            return data.authors.map(author => {
                return( <option key={ author.id } value={author.id}>{ author.name }</option> );
            });
        }
    }

    render() {
        return (
            <form class="addBook">
                <div className="field">
                <label>Book name:</label>
                <input type="text" />
                    </div>
                    <div className="field">
                    <label>Genre:</label>
                <input type="text" />
                    </div>
                    <div className="field">
                    <label>Author:</label>
                <select>
                <option>Select author</option>
                { this.getAllAuthors() }
                </select>
                </div>
                <button>+</button>

            </form>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook);