import { it, expect } from '@jest/globals';
import { render, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import { Provider } from 'react-redux';

import { initStore } from './store';
import { Application } from './Application';
import events from '@testing-library/user-event';

it('по адресу /about должна открываться страница "о проекте"', () => {
    const history = createMemoryHistory({
        initialEntries: ['/about'],
        initialIndex: 0
    });

    const store = initStore();
    const application = (
        <Router history={history} >
            <Provider store={store} >
                <Application />
            </Provider>
        </Router>
    );

    const { getByTestId } = render(application);

    expect(getByTestId('page-title').textContent).toEqual('About');
});


it('если добавить элемент, он появляется в списке', () => {
    const store = initStore();
    const application = (
        <BrowserRouter>
            <Provider store={store} >
                <Application />
            </Provider>
        </BrowserRouter>
    );

    const { getByTestId } = render(application);
    events.type(getByTestId('input-add'), 'Сделать домашку');
    events.click(getByTestId('button-add'))

    const list = getByTestId('list');
    const items = within(list).getAllByTestId('list-item');

    expect(items.map(el => el.textContent)).toContain('Сделать домашку');
    // screen.logTestingPlaygroundURL();
});
