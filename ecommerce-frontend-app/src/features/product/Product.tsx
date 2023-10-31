import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../store/hooks'

import { decrement, increment } from './productSlice'

export function Product() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.product.count)
  const dispatch = useAppDispatch()

  // omit rendering logic
  return(
    <div>
        <h1>ABC</h1>
    </div>
  );
}

export default Product