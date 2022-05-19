import { showBooks } from '../components/pages/books';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/domBuilder';
import navBar from '../components/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';
import { getBooks } from '../../api/bookData';

const startApp = (user) => {
  domBuilder(); // BUILD THE DOM
  domEvents(user.uid); // ADD THE EVENT LISTENTERS TO THE DOM
  formEvents(user.uid); // ADD FORM EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(user.uid); // ATTACH THE EVENT LISTENERS TO THE NAVBAR

  // Put all books on the DOM
  getBooks(user.uid).then((bookArray) => showBooks(bookArray));
};

export default startApp;
