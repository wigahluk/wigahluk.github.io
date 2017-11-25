# 0.3.0

This is the first version I start tracking in this log. Before I was creating posts every time I upgraded dependencies or performed minor changes. I think that just keeping up to date with dependencies is such an ubiquitous and boring activity in Front End world that I'll move all those notes to a special place.

## Updating dependencies

It has been a long time since the last time I updated my blog. The list of my outdated dependencies today is:

```
Package             Current   Wanted   Latest  Location
@types/es6-shim     0.31.33  0.31.35  0.31.35  wigahluk-page
@types/react        15.0.22  15.0.22  16.0.25  wigahluk-page
@types/react-dom    0.14.23  0.14.23   16.0.3  wigahluk-page
css-loader           0.28.0   0.28.0   0.28.7  wigahluk-page
exports-loader        0.6.3    0.6.3    0.6.4  wigahluk-page
http-server           0.9.0    0.9.0   0.10.0  wigahluk-page
jasmine               2.5.3    2.5.3    2.8.0  wigahluk-page
json-loader           0.5.4    0.5.4    0.5.7  wigahluk-page
markdown-it           8.3.1    8.3.1    8.4.0  wigahluk-page
moment               2.17.1   2.17.1   2.19.2  wigahluk-page
react                15.5.4   15.5.4   16.1.1  wigahluk-page
react-dom            15.5.4   15.5.4   16.1.1  wigahluk-page
rxjs                  5.3.0    5.3.0    5.5.2  wigahluk-page
source-map-loader     0.2.1    0.2.1    0.2.3  wigahluk-page
style-loader         0.16.1   0.16.1   0.19.0  wigahluk-page
ts-loader             2.0.3    2.0.3    3.1.1  wigahluk-page
typescript            2.2.2    2.2.2    2.6.1  wigahluk-page
webpack               2.4.1    2.4.1    3.8.1  wigahluk-page
webpack-dev-server    2.4.1    2.4.1    2.9.4  wigahluk-page
```

Lets update all of them and see what happens and how many stuff we need to change :P

All dependencies updated now and only minor changes needed.

## Remove custom development server

When I started using **Webpack 1**, using the Development Server was easier through a wrapper and I did exactly that. Now with **Webpack 3** and its new Development Server is actually pretty easy to configure custom behaviours whitout doing your own server. This will make things easier for people using this project as example as Webpack is the only thing you will need now.

## Bug fixes

* I fixed the List styles to make them closer to what you find in Latex
* Javascript grammar had an error on its definition on comments causing an two or more comments being grouped together including any other content in the middle
* Nested lists are now supported

