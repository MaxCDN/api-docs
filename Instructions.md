# Instructions

## Requirements

* [Node.js](http://nodejs.org)
* OS: Mac, Linux (maybe Cygwin on Windows?)

## Quick Start

**NOTE**: For development, always work out of the "source" branch, never, ever touch "master".

1.) Clone the repo, install the dependencies, and start the development server.

```bash
git clone git@github.com:maxcdn/api-docs.git
npm install
make
make server
```
2.) Visit <http://localhost:3000/> in your browser.

3.) Making changes:

```bash
.
├── config
│   └── config.json   # site configuration
├── public
│   ├── css           # generated css
│   ├── favicon.ico
│   ├── font          # fonts
│   ├── img           # images
│   ├── index.html    # generated html
│   └── js            # javascript
├── README.md          # API Documentation
└── templates          # Jade and Less templates

# Warning: Do not edit *.html, *.min.js or *.min.css files manually.
```

> Note: Server will automatically regenerate an jade, md, css and js files if they change.

4.) Build and deploy site.

```bash
git add .
git commit -m 'I made some changes'
make deploy
```

## Support

If you run into issues please contact <joshua@mervine.net> or <jdorfman@maxcdn.com>

## License

MIT
