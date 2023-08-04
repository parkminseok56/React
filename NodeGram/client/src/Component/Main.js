import React from 'react';
import '../Style/head.css';
import '../Style/main.css';

function Main() {
    return (
        <div className="timeline">
            <div class="twits">
                <div id="hashtag-form">
                    <input type='text' placeholder='태그 검색' />
                    <button class="btn">검색</button>
                </div>

                <div class="twit">

                </div>
            </div>
        </div>
    )
}

export default Main
