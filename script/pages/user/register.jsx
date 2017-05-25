/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-05 14:09:01
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: register.jsx
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-25 11:22:22
 */

import React, {Component, PropTypes} from 'react';
import "../../css/antd.min.css";

import * as actionCreators from '../../redux/action/action.js';
import {bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';
const common = require('../../../common/common');
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    }
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 6
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 14
                }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 14,
                    offset: 6
                }
            }
        };
        const prefixSelector = getFieldDecorator('prefix', {initialValue: '86'})(
            <Select className="icp-selector">
                <Option value="86">+86</Option>
            </Select>
        );
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="E-mail" hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!'
                            }, {
                                required: true,
                                message: 'Please input your E-mail!'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!'
                            }, {
                                validator: this.checkConfirm
                            }
                        ]
                    })(<Input type="password"/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!'
                            }, {
                                validator: this.checkPassword
                            }
                        ]
                    })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
                </FormItem>
                <FormItem {...formItemLayout} label={(
                    <span>
                        Nickname&nbsp;
                        <Tooltip title="What do you want other to call you?">
                            <Icon type="question-circle-o"/>
                        </Tooltip>
                    </span>
                )} hasFeedback>
                    {getFieldDecorator('nickname', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Phone Number">
                    {getFieldDecorator('phone', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your phone number!'
                            }
                        ]
                    })(<Input addonBefore={prefixSelector}/>)}
                </FormItem>
                <FormItem {...tailFormItemLayout} style={{
                    marginBottom: 8
                }}>
                    {getFieldDecorator('agreement', {valuePropName: 'checked'})(
                        <Checkbox>I have read the
                            <a href=""> agreement</a>
                        </Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
