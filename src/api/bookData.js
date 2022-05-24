import axios from 'axios';
import firebaseConfig from './apiKeys';

const dbUrl = firebaseConfig.databaseURL;

// TODO: GET BOOKS
const getBooks = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// TODO: DELETE BOOK
const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => {
      getBooks().then((booksArray) => resolve(booksArray));
    })
    .catch((error) => reject(error));
});

// TODO: GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// TODO: CREATE BOOK
const createBook = () => {};

// TODO: UPDATE BOOK
const updateBook = () => {};

// TODO: FILTER BOOKS ON SALE
const booksOnSale = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/.json?orderBy="sale"&equalTo=true`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// TODO: STRETCH...SEARCH BOOKS

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getSingleBook,
  updateBook
};
