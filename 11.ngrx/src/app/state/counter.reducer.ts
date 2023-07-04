import { on, createReducer } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

const initialState = 0;

export const reducer = createReducer(
    initialState,
    on(increment, state => state + 1),
    on(decrement, state => state - 1),
    on(reset, () => 0)
)
