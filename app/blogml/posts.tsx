'use strict';

import * as React from 'react';

import {Post} from '../models/post';
import {nodeToTags, IBranch, IHeading, IDocument} from '../blogml/postml';

import './posts.styl';
import {Link} from './navigation';

export const MdView = (props: { node: IBranch }) => <div>{ nodeToTags(props.node,'0') }</div>;

export const MdViewWithLink = (props: { node: IDocument, path: string }) => {
    const nodes = props.node.children.slice(1); // assuming the first node is the title
    const newDoc: IDocument = { title: props.node.title, children: nodes, type: 'document' };

    // const h: any = props.node.children.find(n => !!(n as IHeading).h);
    // h.children = [{type: 'link', children: h.children, attrs: { href: props.path }}];
    return <div>{ nodeToTags(newDoc, '0') }</div>;
};

export const PostView = (props: { post: Post }) => {
    const post = props.post;
    const birth = post.date;
    const update = post.modifiedAt;
    return (
        <div className="post">
            <div className="metadata">
                <div className="block">
                    <div className="timestamp">Created on {birth}</div>
                    <div className="timestamp">Updated on {update}</div>
                </div>
            </div>
            <div className="postContent">
                <h1><Link href={`/${post.path}`}>{post.title}</Link></h1>
                <MdViewWithLink node={post.content} path={'/#/post/' + post.fileName} />
            </div>
        </div>
    );
};

export const Posts = (props: { posts: Post[] }) =>
    <div className="postList">
        { props.posts.slice(0, 5).map(p => <PostView post={p} key={p.path} />) }
    </div>;
