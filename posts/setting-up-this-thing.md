Setting up this thing
=====================

I'm starting this... thing. I've started some other blogs, personal pages, etc. in the past. Fore some reason I've never 
maintained them in a regular way.

I think probably my old blog at _Wordpress_ was the one where I wrote more on but then, once I saw it
without being signed in and saw a lot of advertisements (not really a lot, but more than what I liked) I lost the interest on it.

Then I tried _tumblr_, _blogger_, _twitter_ (I know it's not the same) and for some reason I don't get really involved with them.

There are no guaranties that this quasi blog at github will have a better luck, we'll see. There are some things I like so far:

* I can write code directly
* I can have a source control on it
* I can have branches
* I can iterate on it

So this is pretty much as my first post here. I want to add some more stuff, mainly, I want to be able to write my posts
using markdown instead of pure HTML, and also have some nice styles for them including something for dates (this post has no timestamp
nor any other fancy metadata :( ).

Just as a quick note, right now, this blog-like is done as an _[angular](https://angularjs.org/)_ application deployed as a
[gitHub page](https://pages.github.com/). I'm using [Bootstrap](http://getbootstrap.com/) for my basic styles, [google fonts](http://www.google.com/fonts) and
[philbit svg patterns](http://philbit.com/svgpatterns/) for the background images.

Lets try to add some MD support for this rudimentary blog-like thing.

First TODO, find a library. Done: _[angular-markdown-directive](https://github.com/btford/angular-markdown-directive)_. This one works perfect for what I want to do.

Now, replace the about page with the `README.md` content. Done.

Now, lets suppose there are a lot of articles, well, not a lot, but some of them, and that they have the basic metadata, as a timestamp.

I did some styling out of the plan. Changing fonts here and there, now lets back to the plan. Convert this text into an MD file. Done.

Lets create a very simple directive for posts (BTW it is nicer to write texts in MD format than in HTML). Done.

I'm not sure I want to support comments and all these fancy features a common blog has. For now, this blog is pretty unknown and is more an exercise and a toy than a real
publishing platform.