import { Ingredient } from '../api/types';

import { 
  ADD_ITEM,
  DELETE_ITEM,
  CHANGE_ORDER
} from '../actions/burgerConstructor';

export type BurgerConstructorStore = {
  items: Ingredient[]
}

type Action = { type: string, payload: unknown }

const initialState: BurgerConstructorStore = {
  items: []
}

export const burgerConstructorReducer = (state = initialState, action: Action) => {
  switch(action.type) {
    case ADD_ITEM: {
      const ingredient = action.payload as Ingredient;
      const isBun = ingredient.type === 'bun';

      const itemsTemp = [...state.items].filter(({ type }) => isBun ? type !== 'bun' : true);

      return {
        ...state,
        items: [...itemsTemp, ingredient]
      }
    }
    case DELETE_ITEM: {
      let deleted = false;
      const newItems = [];

      // Filter only first element by id, after that just skip
      for (let i = 0; i < state.items.length; i++) {
        const item = state.items[i];

        if (!deleted && action.payload === item._id) {
          deleted = true;
          continue;
        }

        newItems.push(item);
      }

      return {
        ...state,
        items: newItems
      }
    }
    case CHANGE_ORDER: {
      const { dragIndex, hoverIndex } = action.payload as { dragIndex: number, hoverIndex: number };

      const bun = state.items.find(({ type }) => type === 'bun');
      const itemsWithoutBun = state.items.filter(({ type }) => type !== 'bun');
      
      const dragElement = itemsWithoutBun[dragIndex];
      const hoverElement = itemsWithoutBun[hoverIndex];
      
      const tempItems = [...itemsWithoutBun];

      tempItems[hoverIndex] = dragElement;
      tempItems[dragIndex] = hoverElement;

      return {
        ...state,
        items: [...(bun ? [bun] : []), ...tempItems]
      }
    }
    default:
      return state
  }
}
