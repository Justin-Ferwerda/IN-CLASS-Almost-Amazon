import renderToDOM from '../../helpers/renderToDom';

const logoutButton = () => {
  const domString = `<button id="google-auth" class="btn btn-danger ml-2">
    <i class="fas fa-sign-out-alt logout"></i><br>
    Log Out</button>`;
  renderToDOM('#logout-button', domString);
};

export default logoutButton;
