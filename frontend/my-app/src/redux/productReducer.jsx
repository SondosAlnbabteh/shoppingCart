import {
  FETCH_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_ERROR,
} from './Actions';

const initialState = {
  items: [],
  status: 'idle', // 'idle', 'loading', 'succeeded', or 'failed'
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        items: action.payload,
        status: 'succeeded',
      };
    case ADD_PRODUCT:
      return {
        ...state,
        items: [...state.items, action.payload],
        status: 'succeeded',
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        items: state.items.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
        status: 'succeeded',
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        items: state.items.filter(product => product.id !== action.payload),
        status: 'succeeded',
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
