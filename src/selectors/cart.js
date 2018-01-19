import { createSelector } from 'reselect';

// A selector function simply accesses the state and gets a particular info.
export const cartSelector = (state) => state.cart;

// This is an example. createSelector is a function from reselect library
// which can compose many selectors together and uses a cache
// so that it doesn't have to recompute the calculation if none of the input
// selectors changed between two executions.
// export const firstProductSelector = createSelector(
//   productsSelector,
//   (products) => products[0]
// );
