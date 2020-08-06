
 /* 描述: 登录模板
 *  作者: Jack Chen
 *  日期: 2020-08-05
 */


import * as React from 'react';
import { Input, Button, Checkbox, message } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login, register } from '@/store/actions';
import logo from "@/assets/logo_2.png";
import '@/styles/login.less';
import { validUserName, validPass } from '@/utils/valid';
import DocumentTitle from 'react-document-title';

interface IProps {
    login: any,
    register: any,
    history: any
}

interface IState {
    formLogin: {
        userName: string,
        userPwd: string
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

    // 设置cookie
    setCookie = (user_name: string, user_pwd: string, exdays: number) => {
        // 获取时间
        let exdate = new Date(); 
        // 保存的天数
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); 
        // 字符串拼接cookie
        document.cookie = `userName=${user_name};path=/;expires=${exdate.toUTCString()}`;
        document.cookie = `userPwd=${user_pwd};path=/;expires=${exdate.toUTCString()}`;
    }
  
    // 读取cookie
    getCookie = () => {
        const { formLogin } = this.state;
        if (document.cookie.length > 0) {
          // 这里显示的格式需要切割一下自己可输出看下
          let arr = document.cookie.split('; '); 
          console.log(arr) 
          for (let i = 0; i < arr.length; i++) {
            // 再次切割
            let arr2 = arr[i].split('='); 
            // 判断查找相对应的值
            if (arr2[0] === 'userName') {
              // 保存数据并赋值
              this.setState({
                formLogin: {
                    userName: arr2[1],
                    userPwd: formLogin.userPwd
                }
              })
            } else if (arr2[0] === 'userPwd') {
                this.setState({
                    formLogin: {
                        userName: formLogin.userName,
                        userPwd: arr2[1]
                    }
                })
            } else {

            }
          }
        }
    }
  
    //清除cookie
    clearCookie = () => {
        // 修改前2个值都为空，天数为负1天就好了
        this.setCookie('', '', -1); 
    }

    // 立即登录
    handleLogin = () => {
        const { login, history } = this.props; 
        const { formLogin, checked } = this.state;

        if (!validUserName(formLogin.userName)) {
            message.error('请输入正确的邮箱/手机号');
            return false;
        }
    
        if (!validPass(formLogin.userPwd)) {
            message.error('密码应为8到20位字母或数字！');
            return false;
        }
        
        // 判断复选框是否被勾选，勾选则调用配置cookie方法
        if (checked) {
            // 传入账号名，密码，和保存天数3个参数
            this.setCookie(formLogin.userName, formLogin.userPwd, 7);
        } else {
            // 清空Cookie
            this.clearCookie();
        }

        login(
            formLogin.userName, 
            formLogin.userPwd
        )
        .then((res: any) => {
            console.log('login===', res);
            if (res.code === 0) {
                this.clearInput();
                message.success('登录成功');
                history.push('/');
            }
        })
        .catch((error: any) => {
            message.error(error);
        })
    }

    // 立即注册
    handleRegister = () => {
        console.log(this.props)
        const { register, history } = this.props; 
        const { formRegister } = this.state;

        if (!validUserName(formRegister.userName)) {
            message.error("请输入正确的邮箱/手机号");
            return false;
        } else if (!validPass(formRegister.userPwd)) {
            message.error("密码应为8到20位字母或数字！");
            return false;
        } else if (!validPass(formRegister.userPwd2)){
            message.error("确认密码有误");
            return false;
        } else if (formRegister.userPwd2 !== formRegister.userPwd){
            message.error("两次密码不一致");
            return false;
        }

        register(
            formRegister.userName,
            formRegister.userPwd2
        )
        .then((res: any) => {
            if (res.code === 0) {
                this.clearInput();
                message.success('注册成功');
                history.push('/');
            }
        })
        .catch((error: any) => {
            message.error(error);
        })
    }

    // 登录/注册tab切换
    handleTab = (type: number) => {
        // console.log('type===',type);
        this.setState({
            typeView: type
        })
        this.clearInput();
    }

    // 是否勾选记住密码
    checkChange = (e: any) => {
        console.log(e.target.checked);
        this.setState({
            checked: e.target.checked
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

    // 监听输入登录信息
    handleChangeInput = (e: any, type: number) => {
        const { formLogin } = this.state;
        this.setState({
            formLogin: {
                userName: type === 1 ? e.target.value : formLogin.userName,
                userPwd: type === 2 ? e.target.value : formLogin.userPwd
            }
        })
    }

    // 监听输入注册信息
    handleChangeRegister = (e: any, type: number) => {
        const { formRegister } = this.state;
        this.setState({
            formRegister: {
                userName: type === 1 ? e.target.value : formRegister.userName,
                userPwd: type === 2 ? e.target.value : formRegister.userPwd,
                userPwd2: type === 3 ? e.target.value : formRegister.userPwd2
            }
        })
    }

    // 判断点击的键盘keyCode是否为13，是就调用登录函数
    handleEnterKey = (e: any, type: number) => {
        const { formLogin, formRegister } = this.state;
        if (type === 1) {
            if (!formLogin.userName || !formLogin.userPwd) {
                return;
            } else {
                if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
                    this.handleLogin();
                }
            }
        } else {
            if (!formRegister.userName || !formRegister.userPwd || !formRegister.userPwd2) {
                return;
            } else {
                if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
                    this.handleRegister();
                }
            } 
        }
    }

    render () {
        const { formLogin, formRegister, typeView, checked } = this.state;
        return (
            <DocumentTitle title={'用户登陆'}>
                <div className="login-container">
                <div className="pageHeader">
                    <img src={ logo } alt="logo" />
                    <span>后台管理模板</span>
                </div>
                <div className="login-box">
                    <div className="login-text">
                        <span className={ typeView === 0 ? 'active' : '' } onClick={ () => this.handleTab(0) }>登录</span>
                        <b>·</b>
                        <span className={ typeView === 1 ? 'active' : '' } onClick={ () => this.handleTab(1) }>注册</span>
                    </div>

                { typeView === 0 ? 
                    <div className="right-content">
                        <div className="input-box">
                            <Input
                                type="text"
                                className="input"
                                value={ formLogin.userName }
                                onChange={ (e: any) => this.handleChangeInput(e, 1) }
                                placeholder="请输入登录邮箱/手机号"
                            />
                            <Input
                                type="password"
                                className="input"
                                maxLength={ 20 }
                                value={ formLogin.userPwd }
                                onChange={ (e: any) => this.handleChangeInput(e, 2) }
                                onPressEnter={ (e: any) => this.handleEnterKey(e, 1) }
                                placeholder="请输入登录密码"
                            />
                        </div>
                        <Button className="loginBtn" type="primary" onClick={ this.handleLogin } disabled={ !formLogin.userName || !formLogin.userPwd }>立即登录</Button>
                        <div className="option">
                            <Checkbox className="remember" checked={ checked } onChange={ this.checkChange }>
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
                                value={ formRegister.userName }
                                onChange={ (e: any) => this.handleChangeRegister(e, 1) }
                                placeholder="请输入注册邮箱/手机号"
                            />
                            <Input
                                type="password"
                                className="input"
                                maxLength={ 20 }
                                value={ formRegister.userPwd }
                                onChange={ (e: any) => this.handleChangeRegister(e, 2) }
                                placeholder="请输入密码"
                            />
                            <Input
                                type="password"
                                className="input"
                                maxLength={ 20 }
                                value={ formRegister.userPwd2 }
                                onChange={ (e: any) => this.handleChangeRegister(e, 3) }
                                onPressEnter={ (e: any) => this.handleEnterKey(e, 2) }
                                placeholder="请再次确认密码"
                            />
                        </div>
                        <Button className="loginBtn" type="primary" onClick={ this.handleRegister } disabled={ !formRegister.userName || !formRegister.userPwd || !formRegister.userPwd2 }>立即注册</Button>
                    </div>
                }
                
                </div>

            </div>
            </DocumentTitle>
        )
    }
}


export default withRouter(connect((state: any) => state.user, { login, register })(Login))