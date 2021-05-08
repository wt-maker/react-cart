import React, { FC } from 'react';
import { CartItem } from './';
import { Typography } from 'antd';

interface Props {
  item: CartItem,
  onCheckedChangeRef: any,
  checked: boolean
}

function areEqual(preProps:Props, nextProps: Props) {
  return preProps.checked === nextProps.checked;
}

const ItemCard:FC<Props> = React.memo((props: Props) => {

  const { item, onCheckedChangeRef, checked } = props

  const { id, name, price } = item

  const checkBoxChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChangeRef.current(id, !checked)
  }

  return (
    <div className="item-cart">
      <div className="checkbox-wrap">
        <input
          type="checkbox"
          checked={checked}
          onChange={checkBoxChangeHandle}
        />
      </div>
      <p className="item-info">
        {name} <Typography.Text mark>￥{price}</Typography.Text>
      </p>
    </div>
  )
}, areEqual)

export default ItemCard