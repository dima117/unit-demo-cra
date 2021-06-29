import { FC } from 'react';

import { TodoList } from '../components/TodoList';

export const Home: FC = props => {
    return (
        <>
            <h1>Home</h1>
            <p>This is the list.</p>
            <TodoList />
        </>
    );
};