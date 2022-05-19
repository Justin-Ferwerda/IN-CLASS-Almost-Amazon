import addBookForm from '../components/forms/addBookForm';
import {
  deleteBook,
  getSingleBook,
} from '../../api/bookData';
import { showBooks } from '../components/pages/books';
import addAuthorForm from '../components/forms/addAuthorForm';
import { showAuthors } from '../components/pages/authors';
import viewBook from '../components/pages/viewBook';
import { viewBookDetails, deleteAuthorBooks } from '../../api/mergedData';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        // console.warn('CLICKED DELETE BOOK', e.target.id);
        // console.warn(e.target.id.split('--'));
        const [, id] = e.target.id.split('--');

        deleteBook(id, uid).then(showBooks);
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(uid);
    }

    // CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, id] = e.target.id.split('--');

      getSingleBook(id).then((bookObj) => addBookForm(uid, bookObj));
    }

    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      viewBookDetails(firebaseKey).then(viewBook);
    }

    // ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooks(firebaseKey).then(showAuthors);
      }
    }

    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default domEvents;
