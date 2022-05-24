import { getSingleAuthor } from './authorData';
import { getSingleBook } from './bookData';

const viewBookdetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.authorId)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        })
        .catch((error) => reject(error));
    });
});

export default viewBookdetails;
