 /* 描述: 首页模板
 *  作者: Jack Chen
 *  日期: 2020-08-05
 */

import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Header from '@/components/Header';
import '@/styles/home.less';

export default class Home extends React.Component {
    render () {
        return (
            <DocumentTitle title={'首页'}>
                <div className="home-container">
                    <Header />

                </div>
            </DocumentTitle>
        )
    }
}