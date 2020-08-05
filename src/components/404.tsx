 /* 描述: 404模板
 *  作者: Jack Chen
 *  日期: 2020-08-05
 */

import * as React from 'react';
import DocumentTitle from 'react-document-title';

export default class NotFound extends React.Component {
    render () {
        return (
            <DocumentTitle title={'404页面'}>
                <div>这是404页面</div>
            </DocumentTitle>
        )
    }
}