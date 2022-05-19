import checkLoginStatus from './helpers/checkLoginStatus';

import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';

const init = () => {
  checkLoginStatus();
};

init();
