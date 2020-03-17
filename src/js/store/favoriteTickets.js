import currencyUI from '../views/currency';
import favoriteUI from '../views/favorite';

class FavoriteTikets {
  constructor() {
    this.favorite = {};
  }

  getFavorite() {
    favoriteUI.renderFavorite(this.favorite);
  }

  getFavoriteCounter() {
    return Object.values(this.favorite).length;
  }

  deleteFavorite(item) {
    delete this.favorite[item];
    favoriteUI.clearContainer();
    this.getFavorite();
  }

  setFavorite(item) {
    this.favorite[item.id_ticket] = item;
    this.getFavorite();
  }
}

const favoriteTickets = new FavoriteTikets(currencyUI);

export default favoriteTickets;