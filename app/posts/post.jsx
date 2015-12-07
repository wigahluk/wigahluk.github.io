'use strict';

import React from 'react';
import Rx from 'rx';
import MD from 'markdown-it';

class Post extends React.Component {
    render () {
        let post = this.props.post;
        let birth = post.date;
        let update = post.mdate;
        let html = { __html: new MD().render(post.content) };
        return (
            <div className="post">
                <div className="metadata">
                    <div className="block">
                        <div className="timestamp">Created on {birth}</div>
                        <div className="timestamp">Updated on {update}</div>
                    </div>
                </div>
                <div className="postContent">
                    <h1><a href={'/#/post/' + post.name}>{post.title}</a></h1>
                    <div dangerouslySetInnerHTML={html}></div>
                </div>
            </div>
        );
    }
}

export default Post;