/*
 * @Date: 2022-07-26 14:11:23
 * @LastEditors: Cosima
 * @LastEditTime: 2022-07-30 18:55:45
 * @FilePath: /x6-in-react/pages/component/EditComponent.js
 */
import React from 'react'
const EditComponent = ({ node }) => {
  const handleClick = () => {
    node.prop('busData', {name: 'edit', age: 789})
    console.log(node, 'edit----2') 
  }
  return (
    <div onClick={handleClick} style={{position: 'absolute', top: '200px'}}>
      edit
    </div>
  )
}

export default EditComponent
