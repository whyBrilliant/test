import React, { Component } from "react";
import { Input, Form, Select, DatePicker, Row, Col, Button } from 'antd'
// import { Input } from 
const FormItem = Form.Item
const Option = Select.Option
import 'antd/dist/antd.css'; 

class Hello extends Component {
    constructor(props) {
        super(props)
    }

    handleSearch() {
        this.props.form.validateFields((err, value) => {
            if (!err) {
                console.log(err)
            }
            console.log(value)
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (<div>
            <Form>
                <Row>
                    <Col span="12">
                        <FormItem
                            label="Name"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your name!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem
                            label="Gender"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('gender', {
                                rules: [{ required: true, message: 'Please select your gender!' }],
                            })(
                                <Select>
                                    <Option value="male">male</Option>
                                    <Option value="female">female</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem
                            label="Age"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('age', {
                                rules: [{ required: true, message: 'Please input your age!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem
                            label="Color"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('color', {
                                rules: [{ required: true, message: 'Please select your color!' }],
                            })(
                                <Select
                                    placeholder="请输入颜色"
                                >
                                    <Option value="red">red</Option>
                                    <Option value="yellow">yellow</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex">
                    <Col span="4"><Button onClick={this.handleSearch.bind(this)}>确定</Button></Col>
                </Row>
            </Form>
        </div>)
            }
        }

        Hello = Form.create()(Hello)
        
        export default Hello
