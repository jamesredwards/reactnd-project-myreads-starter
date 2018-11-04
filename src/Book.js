import React, { Component } from 'react';
import * as BooksApi from './BooksAPI';

class Book extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onShelfChange(this.props.book, event.target.value);
    BooksApi.update(this.props.book, event.target.value);
  }

  /* function to get image and handle undefined if not available */
  getBookImage(book) {
    if (book.imageLinks && book.imageLinks.thumbnail) {
      return `url(${book.imageLinks.thumbnail})`;
    }
    else {
      return "No Image Available";
    }
  }
  /* function to get authors and handle undefined if not available */
  getAuthors(book) {
    if (book.authors !== undefined) {
      return book.authors.join(', ');
    }
    else {
      return "None";
    }
  }

  /* function to get title and handle undefined */
  getTitle(book) {
    if (book.title !== undefined) {
      return book.title;
    }
    else {
      return "None";
    }
  }

  /* function to ensure consistency on shelf for books on main and search page*/
  getShelf(searchBook) {
    const noShelf = "none";
    if (searchBook.shelf !== undefined) {
      return searchBook.shelf;
    }
    else {
      const findBook = this.props.booksOnShelf.filter(book => book.id === searchBook.id);
      if (findBook.length > 0) {
        return findBook[0].shelf;
      }
      else {
        return noShelf;
      }
    }
  }

  render() {
    const book = this.props.book;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                background: this.getBookImage(book),
              }}
            />
            <div className="book-shelf-changer">
              <select
                defaultValue={this.getShelf(book)}
                onChange={this.handleChange}
              >
                <option value="none" disabled>Move to new shelf...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="read">Read</option>
                <option value="wantToRead">Want to Read</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.getTitle(book)}</div>
          <div className="book-authors">{this.getAuthors(book)}</div>
        </div>
      </li >
    );
  }
}

export default Book;
