import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import { Link, Route } from 'react-router-dom';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  state = {

    booksOnShelf: [],

    shelves: [
      { id: "currentlyReading", name: "Currently Reading" },
      { id: "wantToRead", name: "Want to read" },
      { id: "read", name: "Read" },
    ]
  };

  componentDidMount() {
    BooksAPI.getAll().then(booksOnShelf => {
      this.setState({ booksOnShelf })
    });
  }

  onShelfChange = (bookToChange, shelf) => {
    const existingBooks = this.state.booksOnShelf.filter(book => book.id !== bookToChange.id);
    const newBooksOnShelf = existingBooks.concat([{ ...bookToChange, shelf }]);
    this.setState({ booksOnShelf: newBooksOnShelf });
    //console.log(`Book ${bookToChange.title} moved from ${bookToChange.shelf} to ${shelf}`);
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() =>
            <BookSearch
              booksOnShelf={this.state.booksOnShelf}
              onShelfChange={this.onShelfChange}
            />}
        />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
              {this.state.shelves.map(shelf => (
                <BookShelf
                  key={shelf.id}
                  shelf={shelf}
                  booksOnShelf={this.state.booksOnShelf}
                  books={this.state.booksOnShelf.filter(booksOnShelf => { return booksOnShelf.shelf === shelf.id })}
                  onShelfChange={this.onShelfChange}
                />
              ))}
            </div>
            <div className="open-search">
              <Link to="/search">Add book</Link>
            </div>
          </div>)} />
      </div>

    );
  }
}

export default BooksApp;