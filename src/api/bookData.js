import axios from 'axios';
import firebaseConfig from './apiKeys';

const dbUrl = firebaseConfig.databaseURL;

// TODO: GET BOOKS
const getBooks = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
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
const createBook = (bookObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/books.json`, bookObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/books/${response.data.name}.json`, payload)
        .then(() => {
          getBooks().then(resolve);
        });
    }).catch(reject);
});

// TODO: UPDATE BOOK
const updateBook = (bookObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/books/${bookObj.firebaseKey}.json`, bookObj)
    .then(() => {
      getBooks().then((booksArray) => resolve(booksArray));
    })
    .catch((error) => reject(error));
});

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
