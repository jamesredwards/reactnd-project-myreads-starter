import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Link } from 'react-router-dom';
import Book from './Book';

class BookSearch extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    searchQuery: '',
    booksFound: [],
  };

  updateSearchQuery = query => {
    this.setState(() => ({
      searchQuery: query.trim()
    }));
  }

  /*clearSearchQuery = () => {
      this.updateSearchQuery('');
  }*/

  handleChange(e) {
    if (e.target.value !== '') {
      /*this.updateSearchQuery(e.target.value)*/
      this.setState({ searchQuery: e.target.value.trim() });
      console.log(this.state.searchQuery);
      BooksAPI.search(this.state.searchQuery)
        .then(booksFound => {
          if (booksFound === undefined || booksFound.error) {
            /*debugging*/
            console.log(`No books found matching ${this.state.searchQuery}`)
            this.setState({ booksFound: [] });
          }
          else {
            /*debugging*/
            console.log("Setting booksfound in state");
            this.setState({ booksFound: booksFound });
          }
        })
    }
    else {
      this.setState({ booksFound: [] });
    }
  }

  render() {
    const booksOnShelf = this.props.booksOnShelf;
    console.log(this.state.booksFound)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by author or title..."
              value={this.searchQuery}
              onChange={this.handleChange}
            />
          </div>
        </div>
        {this.state.booksFound !== undefined && (
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.booksFound.map(book => (
                <Book
                  book={book}
                  key={book.id}
                  onShelfChange={this.props.onShelfChange}
                  booksOnShelf={booksOnShelf}
                />
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default BookSearch;