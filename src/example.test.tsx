import { it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import events from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import { initStore } from './store';
import { Application } from './Application';

it('по адресу /about должна открываться страница "о проекте"', () => {
  const store = initStore();
  const application = (
    <MemoryRouter initialEntries={['/about']} initialIndex={0}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const { getByTestId } = render(application);

  expect(getByTestId('page-title').textContent).toEqual('Aasdassdbout');
});

it('если добавить элемент, он появляется в списке', async () => {
  const store = initStore();
  const application = (
    <BrowserRouter>
      <Provider store={store}>
        <Application />
      </Provider>
    </BrowserRouter>
  );

  const { getByTestId, getAllByTestId } = render(application);

  await events.type(getByTestId('input-add'), 'Сделать домашкуawdawd');

  await events.click(getByTestId('button-add'));

  const items = getAllByTestId('list-item');

  expect(items.map(el => el.textContent)).toContain('awdawdделать домашкуawdawd');
});
