"use client"
import { observer } from 'mobx-react'
import { FilterByCheckbox } from './FilterByCheckbox'
import { SHIPPING_LOCATIONS } from '@/constants'
import { shopFilterStore } from '@/services/stores'

export const ShippingFilter = observer(() => {
  return  <FilterByCheckbox
        data={SHIPPING_LOCATIONS}
        storage={shopFilterStore.shippingLocations}
        triggerName="Shipped From"
        value="shipped-from"
        onFilterCheckedChange={(label, value) =>
          shopFilterStore.setShippingLocations({ label, value })
        }
      />
})


