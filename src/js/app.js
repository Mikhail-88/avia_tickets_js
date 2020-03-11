import '../css/style.css';
import './plugins';
import location from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;
  const resetBtn = document.getElementById('reset');

  // Events
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  resetBtn.addEventListener('click', () => {
    ticketsUI.clearConteiner();
  });


  // Handlers
  async function initApp() {
    await location.init();
    formUI.setAutocompleteDate(location.shortCitiesList);
  }

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