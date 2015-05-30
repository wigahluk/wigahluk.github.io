JavaScript Complexity Analysis
==============================

So far I have found two alternatives for doing complexity analysis in JavaScript code.

The first one is [complexity-report](https://github.com/philbooth/complexity-report) that uses [escomplex](https://github.com/philbooth/escomplex) behind the scenes and generates a nice report that can be customized with some CSS. 

The other one is [plato](https://github.com/es-analysis/plato) that also use escomplex but that generates a very nice report including code pointers. It is important to note that Plato uses the same options that complexity-report does

There are some other tools listed in escomplex GitHub read me file, but the one I tested and liked more is plato.

As I already I’m using [Grunt](http://gruntjs.com/) I installed [grunt-plato](https://github.com/jsoverson/grunt-plato) that is maintained by the same guys that work on plato (I know that now there is all this debate about getting rid of Grunt or Gulp, and there is also the battle between Grunt and Gulp, but in my case, using Grunt was simpler). 

The fist step, of course, is install the task tool:

    npm install grunt-plato —save-dev

Then you need to update your `Gruntfile.js`:

    plato: {
            my_page: {
                files: { 'plato-report': ['src/**/*.js'] }
            }
        }

And that’s pretty much all, at least with the default configuration.

The generated report looks like [this one](/plato-report/index.html) (this is the actual report for my page, this page): 