/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-27 17:13:37
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: login.jsx
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-25 11:21:34
 */

'use strict'

import React, {Component, PropTypes} from 'react';
import "../../css/antd.min.css";
import "../../css/user/login.css";
import {Form, Icon, Input, Button, Checkbox} from 'antd';

import * as actionCreators from '../../redux/action/action.js';
import {bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';
const common = require('../../../common/common');

const FormItem = Form.Item;

const propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

class NormalLoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.password = common.encryptPassword(values.password);
                console.log('Received values of form: ', values);
                this.props.actions.login(values);
            }
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {actions, state} = this.props;
        return (
            <Form id="components-form-demo-normal-login" onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your username!'
                            }
                        ]
                    })(
                        <Input prefix={< Icon type = "user" style = {{ fontSize: 13 }}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Password!'
                            }
                        ]
                    })(
                        <Input prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>} type="password" placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const NormalLoginFormWithProps = connect(state => ({state}), dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
}))(NormalLoginForm);

const WrappedNormalLoginForm = Form.create()(NormalLoginFormWithProps);

export default class Login extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 200,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 2,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 20,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 80,
                    "color": "#fff",
                    "opacity": 1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 120,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 300
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true,
            "config_demo": {
                "hide_card": false,
                "background_color": "#141b34",
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        });

    }
    render() {
        return (
            <div className="user-content">
                <div id="particles-js"></div>
                <div className="user-info">
                    <WrappedNormalLoginForm/>
                </div>
            </div>
        );
    }
}
