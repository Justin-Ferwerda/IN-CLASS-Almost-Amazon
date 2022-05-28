import axios from 'axios';
import firebaseConfig from './apiKeys';

const dbUrl = firebaseConfig.databaseURL;

// FIXME:  GET ALL AUTHORS
const getAuthors = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// FIXME: CREATE AUTHOR
const createAuthor = (authorObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, payload)
        .then(() => {
          getAuthors(authorObj.firebaseKey).then(resolve);
        });
    }).catch(reject);
});

// FIXME: GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// FIXME: DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => {
      getAuthors().then((authorsArray) => resolve(authorsArray));
    })
    .catch((error) => reject(error));
});

// FIXME: UPDATE AUTHOR
const updateAuthor = (authorObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${authorObject.firebaseKey}.json`, authorObject)
    .then(() => {
      getAuthors().then(resolve);
    })
    .catch(reject);
});

// TODO: GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${authorId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// GET FAVORITE AUTHORS
const getFavoriteAuthors = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/.json?orderBy="favorite"&equalTo=true`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  deleteSingleAuthor,
  updateAuthor,
  getAuthorBooks,
  getFavoriteAuthors
};
