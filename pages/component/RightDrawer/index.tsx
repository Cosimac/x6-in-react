import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd'

export default function (props: any) {
  const onFinish = (values: any) => {
    const { nodeName } = values

    selectCell.attr('label/text', nodeName)
    props.close()
  }

  const { selectCell } = props
  const nodeName = selectCell.store.data.attrs.label.text
  return (
    <div className="right-drawer">
      <div className="tt">
        <span>节点设置</span>
      </div>
      <div className="wrap">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ nodeName }}
          onFinish={onFinish}
        >
          <Form.Item
            name="nodeName"
            label="节点名称"
            rules={[{ required: true, message: '请输入节点名称' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item style={{ marginTop: '40px', textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}