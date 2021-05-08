import React, { useState, useEffect } from 'react';
import { List, Typography } from 'antd'
import ItemCart from './ItemCart';
import './index.css'

import { useChecked } from './use-checked'

export interface CartItem {
  id: number
  name: string
  price: number
}

const cartData = Array(5).fill(undefined).map((v, i) => (
  {
    id: i,
    name: `商品${i}`,
    price: Math.round(Math.random() * 1000)
  }
))

const Cart = () => {

  const {
    checkedMap,
    onCheckedChange,
    onCheckedChangeRef,
    filterChecked,
    onCheckAllChange
  } = useChecked(cartData)

  useEffect(() => {
    onCheckedChangeRef.current = onCheckedChange;
  })

  const sumPrice = (cartItems: any[]) => {
    return cartItems.reduce((sum, cur) => sum+=cur.price, 0)
  }

  const total = sumPrice(filterChecked())

  const isCheckedAll = cartData.length !==0 && filterChecked().length === cartData.length;

  const onCheckAllChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedAll = !isCheckedAll;
    onCheckAllChange(newCheckedAll);
  }


  const Footer = (
    <div className="footer">
      <div className="check-all">
        <input
          checked={isCheckedAll}
          type="checkbox"
          onChange={onCheckAllChangeHandle}
        />全选
      </div>
      <div>
        价格总计<Typography.Text mark>￥{total}</Typography.Text>
      </div>
    </div>
  )

  return(
    <div className="cart">
      <List
        header={<div>购物车</div>}
        dataSource={cartData}
        footer={Footer}
        renderItem={(item)=> {
          const checked = checkedMap?checkedMap[item.id]:false;
          return(
            <List.Item>
              <ItemCart item={item} onCheckedChangeRef={onCheckedChangeRef} checked={checked}/>
            </List.Item>
          )
        }}
      />
    </div>
  )
};

export default Cart;