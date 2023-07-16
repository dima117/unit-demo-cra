import {FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState, setDone} from "../store";

export const TodoItem: FC<{ index: number }> = (props) => {
    const {index} = props;

    const dispatch = useDispatch();
    const text = useSelector((state: ApplicationState) => state.items[index]);
    const done = useSelector((state: ApplicationState) =>
        Boolean(state.done[index])
    );

    const onChange = useCallback(
        () => dispatch(setDone(index, !done)),
        [index, done, dispatch]
    );

    return null;
};
