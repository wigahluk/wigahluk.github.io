'use strict';

import * as React from 'react';
import * as MarkdownIt from 'markdown-it';
import {Post} from '../models/post';

const PostView = (props: { post: Post }) => {
    const post = props.post;
    const birth = post.date;
    const update = post.modifiedAt;
    const html = { __html: new MarkdownIt().render(post.rawContent) };
    return (
        <div className="post">
            <div className="metadata">
                <div className="block">
                    <div className="timestamp">Created on {birth}</div>
                    <div className="timestamp">Updated on {update}</div>
                </div>
            </div>
            <div className="postContent">
                <h1><a href={'/#/post/' + post.fileName}>{post.title}</a></h1>
                <div dangerouslySetInnerHTML={html}></div>
            </div>
        </div>
    );
};

export default PostView;