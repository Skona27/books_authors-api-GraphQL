import React, {Component} from "react";
import {gql} from 'apollo-boost';
import {graphql, compose} from "react-apollo";

const getAuthorsQuery = gql`
 {
    authors {
        name
        id
    }
 }
`;

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!)
    {
        addBook(name: $name, genre: $genre, authorID: $authorId){
            name
            id
        }
    }
`;

const getBooksQuery = gql`
 {
    books {
        name
        id
    }
 }
`;

class AddBook extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        };
    }

    getAllAuthors(){
        var data = this.props.getAuthorsQuery;

        if(data.loading){
            return( <option disabled>Loading authors</option> );
        } else {
            return data.authors.map(author => {
                return( <option key={ author.id } value={author.id}>{ author.name }</option> );
            });
        }
    };

    submitForm(e) {
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }

    render() {
        return (
            <form className="addBook" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={e=> this.setState({name: e.target.value})} value={this.state.name}/>
                    </div>
                    <div className="field">
                    <label>Genre:</label>
                <input type="text" onChange={e=> this.setState({genre: e.target.value})} value={this.state.genre} />
                    </div>
                    <div className="field">
                    <label>Author:</label>
                <select onChange={e=> this.setState({authorId: e.target.value})}>
                <option>Select author</option>
                { this.getAllAuthors() }
                </select>
                </div>
                <button>+</button>

            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
