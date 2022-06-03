import { getSingleAuthor, getAuthorBooks, deleteSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        })
        .catch((error) => reject(error));
    });
});

const getAuthorsBooks = (authorFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(authorFirebaseKey)
    .then((authorObject) => {
      getAuthorBooks(authorObject.firebaseKey)
        .then((bookObject) => {
          resolve({ bookObject, ...authorObject });
        });
    }).catch((error) => reject(error));
});

const deleteAuthorBooks = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((booksArray) => {
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));
    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewBookDetails, getAuthorsBooks, deleteAuthorBooks };
