//define namespace AppState
import * as AppState from '../../state/app.state';
import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User } from '../user';

export interface State extends AppState.State {
  products: UserState;
}

export interface UserState {
  maskUserName: boolean;
  currentUser: User|null;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
};

//begin Building Selectors
//define User Feature State
const getUserFeatureState = createFeatureSelector<UserState>('user');
//create pure function to return state selector
export const getMaskUserName = createSelector(
  getUserFeatureState,
  (state) => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state) => state.currentUser
);
//end Building Selectors

export const userReducer = createReducer(
  initialState,
  on(createAction('[User] Mask User Name'), (state): UserState => {
    //console.log('original state:'+ JSON.stringify(state));
    return { ...state, maskUserName: !state.maskUserName };
  })
);
