import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';

const viewAuthor = (obj) => {
  clearDom();

  let domString = '';
  let bookString = '';

  domString += `
  <div class="mt-5 d-flex flex-wrap">
   <div class="text-white ms-5 details">
     <h5>${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badgebg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>Author Email: <a href="mailto:${obj.email}">${obj.email}</a>
     <p><i class="fas fa-edit btn btn-info" id="update-author--${obj.firebaseKey}"></i>
        <i class="btn btn-danger fas fa-trash-alt" id="delete-author-btn--${obj.firebaseKey}"></i></p>
     <hr>  
    </div>
  </div>`;
  renderToDOM('#view', domString);

  obj.authorBooks.forEach((book) => {
    bookString += ` <div class="card">
        <img class="card-img-top" src=${book.image} alt=${book.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${book.title}</h5>
            <p class="card-text bold">${book.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${book.price}` : `$${book.price}`}</p>
            <hr>
            <i class="btn btn-success fas fa-eye" id="view-book-btn--${book.firebaseKey}"></i>
            <i id="edit-book-btn--${book.firebaseKey}" class="fas fa-edit btn btn-info"></i>
            <i id="delete-book-btn--${book.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
        </div>
      </div>`;
  });
  renderToDOM('#store', bookString);
};

export default viewAuthor;
