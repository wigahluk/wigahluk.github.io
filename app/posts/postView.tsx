'use strict';

import * as React from 'react';
import {Post} from '../models/post';

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
                <MdViewWithLink node={post.content} path={'/#/post/' + post.fileName} />
            </div>
        </div>
    );
};

interface INode { type: string }
interface IBranch extends INode { children: INode[] }
interface ILeaf extends INode { content: string }
interface IHeading extends IBranch { h: string }
interface ILink extends IBranch { attrs: any }
interface IImage extends ILeaf { attrs: any }

const Heading = (node: IHeading, index: string) =>
    React.createElement('h' + node.h, { key: index }, nodeToTags(node, index));

const Text = (node: ILeaf, index: string) => <span key={index}>{node.content}</span>;

const Paragraph = (node: IBranch, index: string) => <p key={index}>{ nodeToTags(node, index) }</p>;

const Emphasis = (node: IBranch, index: string) => <em key={index}>{ nodeToTags(node, index) }</em>;

const TextStrong = (node: IBranch, index: string) => <strong key={index}>{ nodeToTags(node, index) }</strong>;

const Image = (node: IImage, index: string) => {
    const attrs = node.attrs || {};
    attrs.key = index;
    attrs.alt = node.content;
    return React.createElement('img', attrs)
};

const CodeInline = (node: ILeaf, index: string) => <code key={index}>{ node.content }</code>;

const CodeBlock = (node: ILeaf, index: string) => <pre key={index}><code>{ node.content }</code></pre>;

const BulletList = (node: IBranch, index: string) => <ul key={index}>{ nodeToTags(node, index) }</ul>;

const ListItem = (node: IBranch, index: string) => <li key={index}>{ nodeToTags(node, index) }</li>;

const Link = (node: ILink, index: string) => {
    const attrs = node.attrs;
    attrs.key = index;
    return React.createElement('a', attrs, nodeToTags(node, index))
};

const tags = {
    'heading': Heading,
    'text': Text,
    'paragraph': Paragraph,
    'link': Link,
    'em': Emphasis,
    'code_inline': CodeInline,
    'bullet_list': BulletList,
    'list_item': ListItem,
    'code_block': CodeBlock,
    'image': Image,
    'strong': TextStrong
};

const getTag = (node: INode, index: string) => {
    const tag = tags[node.type];
    if (tag) return tag(node, index);

    console.log(node.type, node);
    return <span key={index}>Unsupported Node Type</span>;
};

const nodeToTags = (node: IBranch, index: string) => node.children.map((n, i) => getTag(n, index + '-' + i));

export const MdView = (props: { node: IBranch }) => <div>{ nodeToTags(props.node,'0') }</div>;

export const MdViewWithLink = (props: { node: IBranch, path: string }) => {
    const h: any = props.node.children.find(n => !!(n as IHeading).h);
    h.children = [{type: 'link', children: h.children, attrs: { href: props.path }}];
    return <div>{ nodeToTags(props.node,'0') }</div>;
};
