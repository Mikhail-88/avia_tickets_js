import '../css/style.css';
import './plugins';
import location from './store/locations';

location.init().then(res => console.log(res));