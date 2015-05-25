Data Visualization JavaScript Libraries
=======================================


A good part of my job is related to data visualization in a web application. As you probably know, the most recent approach to this problem is to draw the graphical artifacts on the browser, removing some of the extra load from the servers. Because of this I’m used to search for JavaScript libraries specialized in charts and time series.

Some of these libraries I have used, some of them I want to try, and some of them I just want to know about. Almost all of them have been open tabs in my browser for months, waiting to have some time to explore them. Today I'm closing these tabs but listing them all here.

 
## Highcharts

This one is probably one of the most famous ones. It is commercial but has a pretty good amount of features and if your company can afford the license price, it is probably a good option to bring to the table.

They offer two versions of their product, the regular one, known simply as Highcharts, that is also the one where more customization can be done, and Highstock, specialized in multi charts and time series.
   
They also offer a minimalist version of their charts to be used as a sparklines.

[highcharts.com](http://www.highcharts.com/)

 
## Plottable

Visually this one is pretty neat and clean. It offers the basic charts: bars, lines and scatters.

[plottablejs.org](http://plottablejs.org/)


## Datakit

This one is a bit more than a chart library. It also includes some neat functionality to do some data analysis.

[github.com/NathanEpstein/datakit](https://github.com/NathanEpstein/datakit)


## Envision

Mainly focused on time series, offers simple but well presented charts. It also support very customized charting, as their fractal example shows.

[www.humblesoftware.com/envision](http://www.humblesoftware.com/envision)


## JointJS

It covers a very good amount of different needs, from UML to Petri nets, including chess diagrams and organizational charts. It is part of a biggest software that provides a diagramming editor online. The editor has a commercial license, but the library is open source.

[jointjs.com](http://jointjs.com/)


## dimple

Works on top of [D3](http://d3js.org) and claims to provide a easier API for creating charts hiding the complexity of D3.
It is also one of cleanest graphically speaking.

[dimplejs.org](http://dimplejs.org/)


## MetricsGraphics

Another library on the top of [D3](http://d3js.org) that also offers neat charts with a minimalistic design.

[metricsgraphicsjs.org](http://metricsgraphicsjs.org/)


## nvd3

This one is part of the [D3](http://d3js.org) libraries, it offers a nice amount of different charts.

[nvd3.org](http://nvd3.org/)


## Flot

Created as a jQuery library to support data visualization. Used in some other data intensive tools as [Grafana](http://grafana.org/). 

[flotcharts.org](http://www.flotcharts.org/)

## Why not D3

There is nothing wrong with [D3](http://d3js.org), actually, it is probably the most complete set of tools for creating visualizations with JavaScript. But it in my personal opinion, it is not a domain specific solution. You can create a domain specific solution on the top of it, and many libraries are doing that, but using D3 without any other library can become a bit of a hard task. When you are visualizing data, you don’t want to invest tons of hours creating charts, you want to work with your data and analyzing your visualizations, and that is why I believe that using a chart specific tool is a better idea than playing directly with D3 or [Rafael](http://raphaeljs.com/). On the other hand, if you are doing your own visualization library, or you want a super customized visualization, the looking into these generic tools is a must.


## Some other folks talking about the same things:

[Jim Vallandingham](http://vallandingham.me/) has a very interesting blog about visualization and data processing.

[Edward Tufte](http://www.edwardtufte.com/tufte/index) is an essential reference on the data visualization world. If you don’t know him, try to google his name and look around of what people says about him and of course, what he himself have and is saying. In my opinion, his *data ink ratio* and the *sparklines* are two of the most interesting ideas in data visualization. His most known work is [The Visual Display of Quantitative Information](http://www.amazon.com/gp/product/0961392142/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0961392142&linkCode=as2&tag=wigahlukblog-20&linkId=6M4GTOWCQXDBDM4U).

[The Functional Art: An introduction to information graphics and visualization](http://www.amazon.com/gp/product/0321834739/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0321834739&linkCode=as2&tag=wigahlukblog-20&linkId=SSXTTBZHZB3JFAWH) is a must read if you are in the data visualization world. Available in [Safari](my.safaribooksonline.com). 
