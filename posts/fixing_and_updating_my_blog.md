Fixing and Updating My Blog
===========================

After some time I came back to this blog and when I wanted to push a new post, well, the thing doesn’t work.

So, the first problem: I upgraded my version of _node_ some time ago. Now I have version 6.5, who knows what version I had when this used to work about 6 months ago (is it not frustrating how fast your code becomes obsolete in _Frontend_ development?).

My first attempt is trying to make the full thing work again without changing too much my code.

OK, so far, so good, I just needed to update my _css-loader_ and my _stylus-loader_ for _Webpack_. I still have a bunch of old dependencies that I want to update. But now all works again and I can start adding posts again.

The next step is to move and organize a bit all the _Webpack_ scripts. They are all around in the root directory. I’m moving all of them to a dedicated folder.

Now we need to upgrade _Webpack_ and its loaders. Just to avoid any other broken functionality due to old versions.

Now, lets start with some more fun. The first thing, add _TypeScript_ support and remove _Babel_ for good. (I really like _Babel_, but I prefer to use _TypeScript_ compiler directly)

Unfortunately, seems that using _TypeScript_ is no that easy, I got into the problem of updating almost all my dependencies, finding typing definitions for a bunch of things and of course now I have another problem, I also need to upgrade my components to use the new React way.

OK, seems that all is working again. `npm outdated` is not giving me any warnings. At least for the next minute, I’m up to date!

After dealing with all these small issues I’m more and more tempted to start using a different approach like _ELM_ or _PureScript_. I’m just sort of tired of the JavaScript ecosystem.

_Update Sep-15_ I have removed all need for doing AJAX calls. Also removed Highlands, I was using it for doing streaming in Node, instead I'm using RxJS also in the build process.

_Update Sep-16_ I have removed React Router. Not a huge improvement on the bundle size, but at least I have less dependencies to worry about. 

_Update Sep-18_ I was able to remove _Markdown-it_ from the bundled dependencies. I'm not using _Commonmark.js_ as was my original intention because I'm planning to add some custom logic on the parsing and right ow _Commonmark.js_ doesn't support custom logic on its parser.
 
_Update Oct-02_ Created the Archive section.  Post count on home page is limited to 5. 

_Update Oct-16_ Using Modern Latin 10pts. Also revisited all the styles in the blog and added some color
syntax for fenced code with a very naive and simplistic lexer.

My TODO now is:

* Add MathJax support for writing some math on my posts.
