import * as React from 'react';
import {Post} from '../models/post';
import {Link} from './navigation';

import './archive.styl'

const ArchiveItem = (props: { post: Post }) => {
    const post = props.post;
    const birth = post.date;
    const update = post.modifiedAt;
    return (
        <div>
            <span className="blog-title"><Link href={`/${post.path}`}>{post.title}</Link></span>
            <div className="metadata">
                <div className="timestamp">Created on {birth}</div>
                <div className="timestamp">Updated on {update}</div>
            </div>
        </div>
    );
};

export const Archive = (props: { posts: Post[] }) =>
    <div className="archive">
        <ul className="archive-list">
            {props.posts.map((p, i) => <li key={i}><ArchiveItem post={p} /></li>)}
        </ul>
    </div>;