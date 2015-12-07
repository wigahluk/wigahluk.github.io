Data Visualization JavaScript Libraries
=======================================


A good part of my job is related to data visualization in a web application. As probably you know, the most common approach to this problem is to draw the graphical artifacts on the browser, removing load from the servers and giving much more control of the visualization to the front end developers and to the user, as they can now interact with the data. Drawing charts on the browser can be done in only one way, using JavaScript (of course you can use Flash or try Silverlight, but allow me to ignore them during this article), and because doing it all from scratch is not advisable, you will end up using a JavaScript library.

This is a short list of JavaScript (or Typescript) libraries that I have found in my safaris across the web, some of them I have used, some others I want to try, and there is also the ones I just want to know about. Almost all of them have been open tabs in my browser for months, waiting for me to have some extra time to experiment with them. Today I'm closing these tabs and listing them all here with some notes for my self that hopefully can be useful to others too.

 
## Highcharts

![Area Chart](/img/highcharts.jpg)

This one is probably one of the most famous ones. It is commercial but has a pretty good amount of features and if your company can afford the license price, it is probably a good option to bring to the table.

They offer two versions of their product, the regular one, known simply as Highcharts, that is also the one where more customization can be done, and Highstock, specialized in multi charts and time series.
   
They also offer a minimalist version of their charts to be used as a sparklines.

[highcharts.com](http://www.highcharts.com/)

 
## Plottable

![Bar Chart](/img/plottable.jpg)

A neat and clean library built on top of [D3](http://d3js.org). It offers the basic charts: bars, lines and scatters. Even if not important for their users, it is nice to know that it is written in [Typescript](http://www.typescriptlang.org/).

[plottablejs.org](http://plottablejs.org/)


## Chart.js

[chart.js](http://www.chartjs.org/)
TODO: Add description and immage.


## Chartist

[gionkunz.github.io/chartist-js](http://gionkunz.github.io/chartist-js/)
TODO: Add description and immage.


## React Sparklines

[borisyankov.github.io/react-sparklines](http://borisyankov.github.io/react-sparklines/)
TODO: Add description and immage.


## React Paths-js

[rsamec.github.io/react-pathjs-chart](http://rsamec.github.io/react-pathjs-chart/)
TODO: Add description and immage.


## Paths.js

[andreaferretti.github.io/paths-js-demo](http://andreaferretti.github.io/paths-js-demo/)
TODO: Add description and immage.


## Victory

[projects.formidablelabs.com/victory](http://projects.formidablelabs.com/victory/)
TODO: Add description and immage.


## Datakit

![Line Chart](/img/datakit.jpg)

This one is a much more than a chart library. It also includes some useful features for data analysis as reading data from different sources and statistical methods.

[github.com/NathanEpstein/datakit](https://github.com/NathanEpstein/datakit)


## Envision and Flotr2

![Area Chart with Zoom](/img/envisionjs.jpg)

Envision is mainly focused on time series, offers simple but well presented charts. It has a nice mode for zooming in and out and for moving the window of visualization across time series (Highstock offers the same feature).

It also support very customized charting, as their fractal example shows.

[www.humblesoftware.com/envision](http://www.humblesoftware.com/envision)

Envision is built on the top of Flor2, maintained by the same company and offering an extendable platform for creating charts.

[www.humblesoftware.com/flotr2](http://www.humblesoftware.com/flotr2/)




## JointJS

![Line Chart](/img/jointjs.jpg)

It covers a very good amount of different needs, from UML to Petri nets, including chess diagrams and organizational charts. It is part of a biggest software that provides a diagramming editor online. The editor has a commercial license, but the library is open source and you can use it for free.

[jointjs.com](http://jointjs.com/)


## dimple

![Line Chart](/img/dimplejs.jpg)

Works on top of [D3](http://d3js.org) and claims to provide an easy API for creating charts hiding the complexity of D3.
The charts styles on this library are one of the cleanest you can get, a ver well implemented graphic design for data visualization.

[dimplejs.org](http://dimplejs.org/)


## MetricsGraphics

![Area Chart](/img/metricsgraphics.jpg)

Another library on the top of [D3](http://d3js.org) that also offers neat charts with a minimalistic design. I’m not sure I like how it handles the axis, but if you are a fan of Tufte, probably you’ll like it.

[metricsgraphicsjs.org](http://metricsgraphicsjs.org/)


## nvd3

![Area Chart](/img/nvd3.jpg)

This one is also built on top of [D3](http://d3js.org). It offers a nice amount of different charts. The generated chart can be sometimes messy, but something you can live with.

[nvd3.org](http://nvd3.org/)


## Flot

![Combined Chart](/img/flot.jpg)

Created as a jQuery library to support data visualization. Used in some other data intensive tools as [Grafana](http://grafana.org/). 

[flotcharts.org](http://www.flotcharts.org/)


## C3

Another tool based on the top of [D3](http://d3js.org). I has a quite friendly API and a nice presentation; mainly useful if you are adding or removing data dynamically from your charts. Not a huge amount of flexibility on the presentation, but if you are more focused on dynamic loading/unloading and don’t want to do a lot of coding, this tool is quite efficient.

[c3js.org](http://c3js.org/)


## Project EON

This tool is build on the top of [C3](http://c3js.org/), and can be seen also as part of the [D3](http://d3js.org) family. It offers a nice API (inherited from the also simple API from C3) for handling dynamic data for real time presentations.

_Unrelated note: Its web site is a bit overloaded and it is not recomendable to leave it there as an open tab for centuries unless you want to find it dead as it happened to me._

[pubnub.com/developers/eon](http://www.pubnub.com/developers/eon/)


## d3-timeline

[github.com/jiahuang/d3-timeline](https://github.com/jiahuang/d3-timeline)
TODO: Add description and immage.


## Why not D3

There is nothing wrong with [D3](http://d3js.org), actually, it is probably the most complete set of tools for creating visualizations with JavaScript. But in my personal opinion, it is  very generic and it is far from being a domain specific solution. 

You can create a domain specific solution on the top of D3, and many libraries are doing that, but using it without any helping library can become a hard task.

When you are visualizing data, you don’t want to invest tons of hours creating charts, you want to work with your data and analyze it with the help of your visualizations; that is why I believe that using a chart specific tool is a better idea than playing directly with D3 or [Rafael](http://raphaeljs.com/), as well as playing these tools is huge better than drawing yourself on a canvas element.

On the other hand, if you are doing your own visualization library, or you want a super customized visualization, looking into a generic tool like D3 can be a wise idea.


## Some other folks talking about the same things:

Well, it is not just that they also talk about the same things, but that they are experts on the field (which I am not).

[Edward Tufte](http://www.edwardtufte.com/tufte/index) is an essential reference on the data visualization world. If you don’t know him, try to google his name and look around of what people says about him and of course, what he himself have and is saying. In my opinion, his *data ink ratio* and the *sparklines* are two of the most interesting ideas in data visualization. His most known work is [The Visual Display of Quantitative Information](http://www.amazon.com/gp/product/0961392142/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0961392142&linkCode=as2&tag=wigahlukblog-20&linkId=6M4GTOWCQXDBDM4U).

[The Functional Art: An introduction to information graphics and visualization](http://www.amazon.com/gp/product/0321834739/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0321834739&linkCode=as2&tag=wigahlukblog-20&linkId=SSXTTBZHZB3JFAWH) is a must read if you are in the data visualization world. Available in [Safari](my.safaribooksonline.com).

[Jim Vallandingham](http://vallandingham.me/) has a very interesting blog about visualization and data processing.

[The Why Axis](http://thewhyaxis.info/) is a blog from [Bryan Connor](http://www.bryanconnor.com/) dedicated to data visualization.
