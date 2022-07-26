/*
 * @Date: 2022-07-26 14:11:23
 * @LastEditors: Cosima
 * @LastEditTime: 2022-07-26 17:43:34
 * @FilePath: \x6-in-react\pages\component\MyComponent.js
 */
import React from 'react'
import { Timeline } from 'antd'
import 'antd/es/timeline/style/css'
import styles from './index.css'
const MyComponent = ({ text = '123' }) => {
  return (
    <div className={styles.nodeTooltips} onClick={() => { console.log('dom1----2') }}>
      <Timeline>
        <Timeline.Item>{text}</Timeline.Item>
        <Timeline.Item>{text}</Timeline.Item>
      </Timeline>
    </div>
  )
}

export default MyComponent
