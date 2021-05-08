import React, { useReducer, useEffect, useCallback, useState } from 'react';


export const useChecked = (cartData) => {

  /* type CheckedMap = {
    [id: number]: boolean
  } */

  const [checkedMap, setCheckedMap] = useState([]);

  const onCheckedChange = (id, checked) => {
    
    const newCheckedMap = Object.assign({}, checkedMap,{
      [id]: checked
    })
    setCheckedMap(newCheckedMap);
  }
  const onCheckedChangeRef = React.useRef(onCheckedChange)

  const filterChecked = () => {
    return Object.entries(checkedMap)
      .filter(e => Boolean(e[1]))
      .map(([checkId]) => cartData.find(({id}) => id === Number(checkId)));
  }

  const onCheckAllChange = (newCheckedAll) => {
    let newCheckedMap = {};
    if (newCheckedAll) {
      cartData.forEach(item => {
        newCheckedMap[item.id] = true;
      })
    }
    setCheckedMap(newCheckedMap);
  }

  return {
    checkedMap,
    onCheckedChange,
    onCheckedChangeRef,
    filterChecked,
    onCheckAllChange
  }
}