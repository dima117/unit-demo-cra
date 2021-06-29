import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Application } from './Application';

import './index.css';
import { initStore } from './store';

const store = initStore();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store} >
            <Application />
        </Provider>
    </BrowserRouter>, 
    document.getElementById('root')
);
