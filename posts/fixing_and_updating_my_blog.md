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