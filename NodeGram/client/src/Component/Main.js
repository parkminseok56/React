import React from 'react';
import '../Style/main.css';

function Main() {
    return (
        <div className="timeline">
            <div className="twits">
                <div id="hashtag-form">
                    <input type="text" placeholder="태그 검색" />
                    <button className="btn">검색</button>
                </div>

                <div class="twit">
                    {/* 게시물들 나올 예정입니다 */}
                </div>

            </div>
        </div>
    )
}

export default Main