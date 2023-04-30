import { TYPE_INGREDIENT } from '../../utils/constants';

import { 
  ADD_ITEM,
  DELETE_ITEM,
  CHANGE_ORDER
} from '../actions/burgerConstructor';

const initialState = {
  items: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_ITEM: {
      const ingredient = action.payload;
      const isBun = ingredient.type === TYPE_INGREDIENT.BUN;

      const itemsTemp = [...state.items].filter(({ type }) => isBun ? type !== TYPE_INGREDIENT.BUN : true);

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
      const { dragIndex, hoverIndex } = action.payload;

      const bun = state.items.find(({ type }) => type === TYPE_INGREDIENT.BUN);
      const itemsWithoutBun = state.items.filter(({ type }) => type !== TYPE_INGREDIENT.BUN);
      
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
