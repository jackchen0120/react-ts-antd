 /* 描述: 首页模板
 *  作者: Jack Chen
 *  日期: 2020-08-05
 */

import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { Button, Table, Space, Pagination } from 'antd';
import Header from '@/components/Header';
import '@/styles/home.less';

const columns = [
    {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        width: 80,
    },
    {
        title: '任务名称',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: '任务内容',
        dataIndex: 'content',
        key: 'content'
    },
    {
        title: '截止日期',
        dataIndex: 'gmt_expire',
        key: 'gmt_expire'
    },
    {
        title: '任务状态',
        dataIndex: 'status',
        key: 'status',
        filters: [
            { text: '待办', value: 0 },
            { text: '完成', value: 1 },
            { text: '删除', value: 2 },
        ]
    },
    {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
            <Space size="middle">
                <Button style={{marginRight: "10px"}}>编辑</Button>
                <Button type="primary" ghost style={{marginRight: "10px"}}>完成</Button>
                <Button danger>删除</Button>
            </Space>
        )
    }
]

const dataSource: object[] = [];

interface IState {
    total: number,
    pageNo: number,
    pageSize: number,
    loading: boolean
}

class Home extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            total: 0,
            pageNo: 1,
            pageSize: 10,
            loading: false
        }
    }


    addTask = () => {
        console.log('添加任务===');
    }

    changePage = (pageNo: number) => {
        console.log('pageNo=', pageNo)
        this.setState(
          (state) => ({
            pageNo
          }), () => {
            console.log('分页点击跳转')
            // this.fetchData();
          }
        );
    }

    render () {
        const { total, pageNo, pageSize, loading } = this.state;
        return (
            <DocumentTitle title={'首页'}>
                <div className="home-container">
                    <Header />

                    <div className="content clearfix">
                        <div className="list">
                            <h2>任务列表</h2>
                            <Button type="primary" size="large" onClick={ this.addTask }>添加任务</Button>
                        </div>

                        
                        <Table 
                            bordered 
                            dataSource={ dataSource } 
                            columns={ columns }
                            loading={ loading }
                            pagination={ false } 
                        />
                        <Pagination
                            className="pagination"
                            total={ total }
                            showTotal={total => `共 ${total} 条数据`}
                            onChange={ () => this.changePage }
                            current={ pageNo }
                            defaultPageSize={ pageSize }
                            hideOnSinglePage={ false }
                        />
                    </div>

                </div>
            </DocumentTitle>
        )
    }
}

export default Home