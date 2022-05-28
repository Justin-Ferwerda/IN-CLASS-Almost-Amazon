import { createAuthor } from '../../api/authorData';
import { createBook } from '../../api/bookData';
import { showAuthors } from '../components/pages/authors';
import { showBooks } from '../components/pages/books';

const formEvents = () => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        description: document.querySelector('#description').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author_id').value,
      };

      createBook(bookObject).then((booksArray) => showBooks(booksArray));
    }

    // TODO: CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      console.warn('CLICKED UPDATE BOOK', e.target.id);
      console.warn(firebaseKey);
    }

    // FIXME: ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      const authorObject = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: '',
        uid: ''
      };

      createAuthor(authorObject).then((authorsArray) => showAuthors(authorsArray));
    }
    // FIXME:ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default formEvents;
