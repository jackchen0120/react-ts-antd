 /* 描述: 底部footer模板
 *  作者: Jack Chen
 *  日期: 2020-08-02
 */

import * as React from 'react';
import '@/styles/footer.less';

export default class Footer extends React.Component {
    render () {
        return (
            <div className="footer-container">
                <div className="footer">
                    <div className="copyright">
                        Copyright@2020-2025 微信公众号{'<懒人码农>'} 湘ICP备19016532号-1
                    </div>
                </div>
            </div>
        )
    }
}