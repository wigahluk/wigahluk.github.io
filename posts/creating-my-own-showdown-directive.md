Creating my own Showdown directive
==================================

I was using, as I mentioned earlier, the _btford_ angular-markdown-directive and it was working pretty nice,
until I tried to include some HTML code in my markdown files. Looking into the directives code, I noticed that it
was using `ng-include` as the mechanism to retrieve the markdown files.

When Angular loads the content using `ng-include`, it is applying what they call
["Strict Contextual Escaping"](https://docs.angularjs.org/api/ng/service/$sce) and it was escaping my HTML tags.

As there was not an easy solution that prevented ths escaping, I decided to create my own directive and use the `$http` module
for loading my files.

I have a problem focusing on a single thing and it is pretty common that I get distracted in the middle of my way. 
That's what happened this time. Once I started planning for my new directive I started thinking on what were the features
I would like to have on it:
 
* Being able to define the content through a directive parameter. This was my main use case as I was also building my own 
service for handling my articles. I know I said I wanted a very simple thing at the beginning, but adding dates on each 
HTML entry was becoming difficult for a distracted person like me, even with a couple of articles :P 
* Support urls for and download the remote content. Supposing that the content is coming from a trusted source that 
support `CORS`.
* Support embeded content into the same directive, something similar to this: `<ng-showdown>#My Title</ng-showdown>`

So, after defining my requirements, more than what I really needed in fact, I started coding my directive. The one that
now I'm using here :)

At the end, I was able to support the following cases:

    <ng-showdown>Inserting markdown in the HTML</ng-showdown>
    <ng-showdown source="myScopeVariable"></ng-showdown>
    <ng-showdown href="myurl.md"></ng-showdown>
    
The last thing I needed was to be able to add some extra post processing before any rendering.
I added an extra parameter called `onLoad` that expects a function like:
 
    function myHandler (data, xhr) {}
    
where `data` is the content of the file and `xhr` is the _xhr_ object from the _jQuery_ Ajax call.

As an extra feature, I changed a bit the styling of the site. It still needs some refactoring though, but now it doesn't 
looks as old fashion as before :)