import { getPriceDiscountValue } from '@/utils'
import React from 'react'

type ProductPricePropsType = {
    regular_price: number
    currency?: string
    sale_price?: number
    discount?: number
}

export const ProductPrice = ({
    regular_price,
    discount = 0,
    sale_price,
    currency = "৳"
}: ProductPricePropsType) => {
  return (
    <div className='text-4xl font-semibold flex justify-start items-end gap-2'>
        <span className='text-lg'>{currency}</span>
        {
            discount && !sale_price ? <p>{getPriceDiscountValue(regular_price, discount)} <span className='line-through text-gray-500'>{regular_price}</span></p> : sale_price && !discount ?  <p>{sale_price} <span className='line-through text-gray-500'>{regular_price}</span></p>: <p>{regular_price}</p>
        }
   
    </div>
  )
}

