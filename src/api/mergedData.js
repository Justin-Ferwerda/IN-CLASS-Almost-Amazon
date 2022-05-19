import {
  deleteSingleAuthor,
  getAuthorBooks,
  getSingleAuthor
} from './authorData';
import {
  deleteBook,
  getSingleBook
} from './bookData';

// const viewBookDetails = (bookFirebasekey) => new Promise((resolve, reject) => {
//   getSingleBook(bookFirebasekey)
//     .then((bookObject) => {
//       getSingleAuthor(bookObject.author_id)
//         .then((authorObject) => {
//           resolve({ authorObject, ...bookObject });
//         });
//     }).catch(reject);
// });

const viewBookDetails = async (bookFirebaseKey) => {
  const bookObject = await getSingleBook(bookFirebaseKey);
  const authorObject = await getSingleAuthor(bookObject.author_id);

  return { authorObject, ...bookObject };
};

const deleteAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  getAuthorBooks(authorId).then((authorsBookArray) => {
    const deleteBooks = authorsBookArray.map((book) => deleteBook(book.firebaseKey));

    // GET some dinner
    Promise.all([...deleteBooks]).then(() => resolve(deleteSingleAuthor(authorId)));
  }).catch(reject);
});

export { viewBookDetails, deleteAuthorBooks };
