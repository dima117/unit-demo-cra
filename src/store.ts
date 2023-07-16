import { createStore } from "redux";

export interface ApplicationState {
  text: string;
  items: string[];
  done: Record<number, boolean>;
}

const items = ["Позавтракать", "Сходить в магазин", "Покормить кота"];

const DEFAULT_STATE = { items, done: {}, text: "" };

// actions
export const addItem = (text: string) => ({ type: "ADD_ITEM", text } as const);
export const setText = (text: string) => ({ type: "SET_TEXT", text } as const);
export const setDone = (index: number, done: boolean) =>
  ({ type: "SET_DONE", index, done } as const);

export type Action =
  | ReturnType<typeof addItem>
  | ReturnType<typeof setText>
  | ReturnType<typeof setDone>;

// reducer
const rootReducer = (
  state: ApplicationState = DEFAULT_STATE,
  action: Action
) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        text: "",
        items: [...state.items, action.text],
      };
    case "SET_TEXT":
      return {
        ...state,
        text: action.text,
      };
    case "SET_DONE":
      return {
        ...state,
        done: {
          ...state.done,
          [action.index]: action.done,
        },
      };
    default:
      return state;
  }
};

// epics

export function initStore() {
  const store = createStore<ApplicationState, Action, {}, {}>(rootReducer);

  return store;
}
