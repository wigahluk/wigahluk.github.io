Fixing and Updating My Blog
===========================

After some time I came back to this blog and when I wanted to push a new post, well, the thing doesn’t work.

I’m still figuring out what the problem is, but I wanted to write a new entry about that and about the painful path that new and modern _frontend_ development have become.

On the old days, starting a web page was just about starting an HTML, putting some JS and CSS and that was all. Now we have all this super features, super flexibility and what not, but as a payment, we now have to download half of the internet in _Node_ dependencies, configure _Webpack_ and do a bunch of things completely unrelated to the app we are writing. I don’t know about you, but I really hate all that.

So, the first problem: I upgraded my version of node some time ago. Now I have version 6.5, who knows what version I had when this used to work.

My first attempt is trying to make the full thing work again without changing too much my code.

OK, so far, so good, I just needed to update my _css-loader_ and my _stylus-loader_ for Webpack. I still have a bunch of old dependencies that I want to update. But now all works again and I can start adding posts.

Now, lets start with some more fun. The first ting, add TypeScript support and remove Babel for good. (I really like Babel, but I prefer to use TypeScript compiler directly).
