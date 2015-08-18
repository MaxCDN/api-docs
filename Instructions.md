# Instructions

## Requirements

* [Node.js](http://nodejs.org)
* OS: Mac, Linux (maybe Cygwin on Windows?)

## Quick Start

1.) Clone the repo, install the dependencies, and start the development server. Make changes directly on master and commit them before running the next steps
# Warning: Do not edit *.html, *.min.js or *.min.css files manually.

```bash
git clone https://github.com/MaxCDN/api-docs.git
```

1.) Install the dependencies, and start the development server.

```bash
npm install
make
make server
```
2.) Visit <http://localhost:3000/> in your browser to view the changes.

4.) Build and deploy site.

```bash
git checkout gh-pages
git checkout master
make
git add .
git commit -m 'I made some changes'

# WARNING: This will forcefully overide the 'gh-pages' branch with no quarter or mercy.
#          Be sure you're working on the latest remote version and know what you're doing.
# Be sure that you already have a gh-pages branch checked out locally or this will FUCK the MAKE system
make deploy
git push
```

5.) Finally you need to run a Python script:
```python
#!/usr/bin/python
# simple script to purge maxcdn website(s)
from netdnarws import NetDNA
api = NetDNA("ALIAS", "KEY", "SECRET")
for zone_id in [113937]: #docs.maxcdn.com
        api.delete("/zones/pull.json/%i/cache" % zone_id)
print "Purged Docs"
```

## Adding new tabs

If you are adding new tabs in docs make sure to add div identificator (ruby, python, php, node, csharp,...) into /public/js/main.js and /public/js/main.min.js to 
skip scrolling effect on switching between them:

```bash
if (target.toString().indexOf('#ruby') ==-1 &&
                target.toString().indexOf('#python') ==-1 &&
                target.toString().indexOf('#php') ==-1 &&
                target.toString().indexOf('#node') ==-1 &&
                target.toString().indexOf('#csharp') ==-1 &&
                target.toString().indexOf('#response') ==-1 )
```

## Support

If you run into issues please contact <joshua@mervine.net> or <jdorfman@maxcdn.com>

## License

MIT
