 /* 描述: 头部header模板
 *  作者: Jack Chen
 *  日期: 2020-08-03
 */

import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Modal, Form, Button, Input, message } from 'antd';
import store from '@/store';
import { logout } from '@/store/actions';
import { DownOutlined } from '@ant-design/icons';
import logo from '@/assets/logo_2.png';
import avatar from '@/assets/avatar.jpg';
import '@/styles/header.less';
import { resetPwd } from '@/utils/api';
import { validPass } from '@/utils/valid';

interface Values {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}

interface IProps {
    loading: boolean,
    visible: boolean,
    onOk: (values: Values) => void,
    onCancel: () => void
}

const formItemLayout = {
    labelCol: {
      sm: { span: 6 },
    },
    wrapperCol: {
      sm: { span: 12 },
    },
}

const ModifyUserForm: React.FC<IProps> = ({
    loading,
    visible,
    onOk,
    onCancel
}) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
        .then((values: any) => {
            onOk(values);
        })
        .catch(info => {
            console.log('Validate Failed:', info);
        })
    }    

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    }

    return (
        <Modal
            visible={ visible }
            centered
            title="修改密码"
            okText="确认"
            cancelText="取消"
            onCancel={ handleCancel }
            onOk={ handleOk }
            footer={[
                <Button key="back" onClick={ handleCancel }>取消</Button>,
                <Button key="submit" type="primary" loading={ loading } onClick={ handleOk }>确认</Button>,
              ]}
        >
            <Form
                form={form}
                {...formItemLayout}
                name="form_in_modal"
            >
                <Form.Item
                    label="旧密码"
                    name="oldPassword"
                    rules={[{ required: true, message: '请输入旧密码' }]}
                >
                    <Input type="password" placeholder="请输入旧密码" maxLength={ 20 } />
                </Form.Item>
                <Form.Item 
                    label="新密码"
                    name="newPassword"
                    rules={[{ required: true, message: '请输入新密码' }]}
                >
                    <Input type="password" placeholder="请输入新密码" maxLength={ 20 } />
                </Form.Item>
                <Form.Item 
                    label="确认新密码"
                    name="confirmPassword"
                    rules={[{ required: true, message: '请再次确认新密码' }]}
                >
                    <Input type="password" placeholder="请再次确认新密码" maxLength={ 20 } />
                </Form.Item>
            </Form>
        </Modal>
    )
}


const Header = (props: any) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { curActive } = props;
    console.log('props===', props)

    const onOk = (values: Values) => {
        console.log('Received values of form: ', values);

        if (!validPass(values.oldPassword)) {
            message.error("旧密码应为8到20位字母或数字！");
            return false;
        } else if (!validPass(values.newPassword)) {
            message.error("新密码应为8到20位字母或数字！");
            return false;
        } else if (!validPass(values.confirmPassword)){
            message.error("确认密码有误");
            return false;
        } else if (values.confirmPassword !== values.newPassword){
            message.error("两次密码不一致");
            return false;
        }
        
        setLoading(true);
        console.log((store.getState() as any).user.data)
        let username = (store.getState() as any).user.data.userData.username;

        let data = {
            username: username,
            oldPassword: values.oldPassword,
            newPassword: values.confirmPassword
        }

        resetPwd(data)
        .then((res: any) => {
            console.log('修改密码===', res)
            setLoading(false);
            if (res.code === 0) {
                setVisible(false);
                message.success('修改密码成功');
            } else {
                message.error(res.msg);
            }
        })
        .catch(() => {
            setLoading(false); 
        })
    }

    const onCancel = () => {
        setVisible(false);
    }

    const onClick = (e: any) => {
        // console.log(e.key)
        if (e.key === '1') {
            setVisible(true);
        } else {
            store.dispatch(logout());
        }
    };
    
    const menu = (
        <Menu onClick={ onClick }>
            <Menu.Item key="1">修改密码</Menu.Item>
            <Menu.Item key="2">退出</Menu.Item>
        </Menu>
    );

    return (
        <div className="header-container">
            <div className="header">
                <div className="section">
                    <img src={ logo } alt="logo" />
                    <ul>
                        <li>
                            <a href="/" rel="noopener noreferrer" className={ curActive }>首页</a>
                        </li>
                        <li>
                            <a href="https://jackchen0120.github.io/vueDataV/" target="_blank" rel="noopener noreferrer">大数据可视化平台</a>
                        </li>
                        <li>
                            <a href="https://juejin.im/user/5eafd5fff265da7be959f56a" target="_blank" rel="noopener noreferrer">掘金</a>
                        </li>
                        <li>
                            <a href="https://blog.csdn.net/qq_15041931" target="_blank" rel="noopener noreferrer">CSDN</a>
                        </li>
                    </ul>
                </div>

                <Dropdown overlay={ menu }>
                    <a className="dropdown-link" href="/#" onClick={ e => e.preventDefault() }>
                        <span className="username">{ (store.getState() as any).user.data.userData.username }</span>
                        <img className="avatar" src={ avatar } alt="" />
                        <DownOutlined />
                    </a>
                </Dropdown>
            </div>

            <a href="https://github.com/jackchen0120" target="_blank" rel="noopener noreferrer" className="github-corner">
                <svg width="82" height="82" viewBox="0 0 250 250">
                    <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path> 
                    <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" className="octo-arm"></path> 
                    <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path>
                </svg>
            </a>

            <ModifyUserForm
                visible={ visible }
                loading={ loading }
                onOk={ onOk }
                onCancel={ onCancel }
            />

        </div>
    )
}

export default Header
