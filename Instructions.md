# Instructions

## Requirements

* [Node.js](http://nodejs.org)
* OS: Mac, Linux (maybe Cygwin on Windows?)

## Quick Start

1.) Clone the repo, install the dependencies, and start the development server. Make changes directly on master and commit them before running the next steps
# Warning: Do not edit *.html, *.min.js or *.min.css files manually.

```bash
git clone git@github.com:maxcdn/api-docs.git
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
git add .
git commit -m 'I made some changes'

# WARNING: This will forcefully overide the 'gh-pages' branch with no quarter or mercy.
#          Be sure you're working on the latest remote version and know what you're doing.
# Be sure that you already have a gh-pages branch checked out locally or this will FUCK the MAKE system
make deploy
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

## Support

If you run into issues please contact <joshua@mervine.net> or <jdorfman@maxcdn.com>

## License

MIT
