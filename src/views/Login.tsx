import * as React from 'react';
// import { Redirect } from 'react-router-dom';
import { Input, Button, Checkbox, message } from 'antd';
import { connect } from 'react-redux';
import { login } from '../store/actions';
import logo from "@/assets/logo.png";
import '@/styles/login.less';

interface IProps {
    login: any
}

interface IState {
    formLogin: {
        userName?: string,
        userPwd?: string
    },
    formRegister: {
        userName?: string,
        userPwd2?: string,
        userPwd?: string,
    },
    typeView: number,
    checked: boolean,
    isLoading: boolean
}

class Login extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            formLogin: {
                userName: '',
                userPwd: '',
            },
            formRegister: {
                userName: '',
                userPwd2: '',
                userPwd: '',
            },
            typeView: 0,
            checked: false,
            isLoading: false
        }
    }

    // 立即登录
    handleLogin = () => {
        const { login } = this.props; 
        login(
            this.state.formLogin.userName, 
            this.state.formLogin.userPwd
        )
        .then((res: any) => {
            message.success('登录成功');
        })
        .catch((error: any) => {
            message.error(error);
        })
    }

    // 立即注册
    handleRegister = () => {
        console.log('注册')
    }

    handleTab = (type: number) => {
        console.log('type===',type);
        this.setState({
            typeView: type
        })
        this.clearInput();
    }

    // 是否勾选记住密码
    checkChange = (status: boolean) => {
        console.log(status);
        this.setState({
            checked: status
        })
    }

    // 清空输入框
    clearInput = () => {
        this.setState({
            formLogin: {
                userName: '',
                userPwd: '',
            },
            formRegister: {
                userName: '',
                userPwd2: '',
                userPwd: '',
            }
        })
    }

    // 忘记密码界面
    forgetPwd = () => {
        message.info('忘记密码，请联系客服');
    }

    handleChangeInput = (e: any) => {
        console.log('username=',e.target.value)
        this.setState({
            formLogin: {
                userName: e.target.value
            }
        })
    }

    render () {
        return (
            <div className="login-container">
                <div className="pageHeader">
                    <img src={ logo } alt="logo" />
                    <span>TODO区块链管理平台</span>
                </div>
                <div className="login-box">
                    <div className="login-text">
                        <span className={ this.state.typeView === 0 ? 'active' : '' } onClick={ () => this.handleTab(0) }>登录</span>
                        <b>·</b>
                        <span className={ this.state.typeView === 1 ? 'active' : '' } onClick={ () => this.handleTab(1) }>注册</span>
                    </div>

                { this.state.typeView === 0 ? 
                    <div className="right-content">
                        <div className="input-box">
                            <Input
                                type="text"
                                className="input"
                                value={ this.state.formLogin.userName }
                                onChange={ this.handleChangeInput }
                                placeholder="请输入登录邮箱/手机号"
                            />
                            <Input
                                type="password"
                                className="input"
                                value={ this.state.formLogin.userPwd }
                                placeholder="请输入登录密码"
                            />
                        </div>
                        <Button className="loginBtn" type="primary" onClick={ this.handleLogin } disabled={true}>立即登录</Button>
                        <div className="option">
                            <Checkbox className="remember" v-model="checked" onChange={ () => this.checkChange }>
                                <span className="checked">记住我</span>
                            </Checkbox>
                            <span className="forget-pwd" onClick={ this.forgetPwd }>忘记密码?</span>
                        </div>
                    </div>
                    :
                    <div className="right_content">
                        <div className="input-box">
                            <Input
                                type="text"
                                className="input"
                                value={ this.state.formRegister.userName }
                                placeholder="请输入注册邮箱/手机号"
                            />
                            <Input
                                type="password"
                                className="input"
                                value={ this.state.formRegister.userPwd }
                                placeholder="请输入密码"
                            />
                            <Input
                                type="password"
                                className="input"
                                value={ this.state.formRegister.userPwd2 }
                                onClick={ this.handleRegister }
                                placeholder="请再次确认密码"
                            />
    `                   </div>
                        <Button className="loginBtn" type="primary" onClick={ this.handleRegister }>立即注册</Button>
                    </div>
                }
                
                </div>



            </div>
        )
    }
}


export default connect((state: any) => state.user, { login })(Login)