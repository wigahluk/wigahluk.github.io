Autogenerate the Index of Posts
===============================

The next feature I want to add is actually not a change on the usability of this site, but on my own usability. 
Writing manually the list of entries each time I add something is not very fun. What I want is to write the articles and 
then the machine to generate the index of entries for me.

These are the things I need to do:

* Read the files in a certain directory
* Generate a JSON file with some metadata for each file: Creation date, title, path.
* Update my post service to use the generated index file.
* Update everything else to use this new capability.

Done! :)

I started with npm alone, but after struggling a bit with it and the minification and generation of files, I ended up 
configuring Grunt for the project.
 
Now I'll start adding all my files to the minification list. But for now, I'm good. 
