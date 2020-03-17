import '../css/style.css';
import './plugins';
import location from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets';
import favoriteTickets from './store/favoriteTickets';
import favoriteUI from './views/favorite';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;
  const resetBtn = document.getElementById('reset');
  const favoriteBtn = document.getElementById('favorites');
  const favoriteCounter = document.querySelector('.favorites_counter');

  /*  Events  */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  resetBtn.addEventListener('click', () => {
    ticketsUI.clearConteiner();
  });

  // add favorite ticket
  ticketsUI.container.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('add-favorite')) {
      const favTicket = location.lastSearch.find(item => item.id_ticket === Number(target.dataset.userFavorite));
      favoriteTickets.setFavorite(favTicket);
      target.closest('.col').remove();
      favoriteCounter.textContent = favoriteTickets.getFavoriteCounter();
    }
  });

  // delete favorite ticket
  favoriteUI.containerFavorite.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('delete-favorite')) {
      let item = target.dataset.userDelete;
      favoriteTickets.deleteFavorite(item);
      favoriteCounter.textContent = favoriteTickets.getFavoriteCounter();
    }
  });

  //show favorite 
  favoriteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    favoriteTickets.getFavorite();
  });

  async function initApp() {
    await location.init();
    formUI.setAutocompleteDate(location.shortCitiesList);
  }

  // Handler for Form
  async function onFormSubmit() {
    // сбор данных
    const origin = location.getCityCodeByKey(formUI.originValue);
    const destination = location.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await location.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(location.lastSearch);
  }
});