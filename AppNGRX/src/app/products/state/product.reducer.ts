//define namespace AppState
import * as AppState from '../../state/app.state'
import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../product';
import * as ProductActions from './product.actions';

export interface State extends AppState.State{
  products: ProductState
}

export interface ProductState{
  showProductCode: boolean;
  currentProduct: Product|null;
  currentProductId: number;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode : true,
  currentProduct: null,
  currentProductId: 0,
  products: []
};

//begin Building Selectors
//define Product Feature State
const getProductFeatureState = createFeatureSelector<ProductState>('products');

//create pure function to return state selector
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state=>state.showProductCode
);

// export const getCurrentProduct = createSelector(
//   getProductFeatureState,
//   state=>state.currentProduct
// );

export const getCurrentProductId = createSelector(
  getProductFeatureState,  
  (state)=> state.currentProductId  
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId)=> state.products.find(p=>p.id === currentProductId)
);

export const getproducts = createSelector(
  getProductFeatureState,
  state=>state.products
);

//end Building Selectors

//Reducer
export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.toggleProductCode, (state):ProductState => {
    //console.log('original state:'+ JSON.stringify(state));
    return { 
      ...state, 
      showProductCode: !state.showProductCode,      
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState =>{
    return {
      ...state,
      currentProduct: action.product
    }
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState =>{
    return {
      ...state,
      currentProduct: null
    }
  }),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    };
  })
);
