import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState, addItem, setText } from '../store';
import { TodoItem } from './TodoItem';

export const TodoList: FC = () => {
    const dispatch = useDispatch();
    
    const items = useSelector((state: ApplicationState) => state.items);
    const text = useSelector((state: ApplicationState) => state.text);
    
    const onChange = useCallback(({ target }) => {
        dispatch(setText(target.value));
    }, [dispatch]);

    const onClick = useCallback(() => {
        dispatch(addItem(text));
    }, [dispatch, text]);

    return (
        <div>
            <div>
                <input value={text} onChange={onChange} />
                <button onClick={onClick}>Добавить</button>
            </div>
            <div className="list">
                {items.map((text, i) => <TodoItem key={i} index={i} />)}
            </div>
        </div>
    );
}

