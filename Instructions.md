
# Instructions

## Requirements

* [Node][node]
* [Grunt](#grunt)

[node]: http://nodejs.org

## Grunt

Install `grunt` after you've installed Node.

```bash
npm install -g grunt-cli
```

## Quick Start

**NOTE**: For development, always work out of the "source" branch, never, ever touch "master".

1. Clone the repo, install the  dependencies, and start the preview server.

    ```bash
    git clone git@github.com:netdna/netdna.github.com.git
    npm install
    ./preview
    ```

2. Visit <http://localhost:8080/> in your browser.

3. Make changes to `./Readme.md` and refresh the page.

4. You can also edit `./templates/layout.jade` for HTML changes using the [Jade][jade] template engine.

[jade]: http://jade-lang.com

5. Make CSS changes using LESS or plain CSS by editing files in the `./contents/css` folder.

6. Add images in the `./contents/img/` folder and fonts in the `./contents/font/` folder.

7. When you're ready to deploy your changes:

    ```bash
    git add .
    git commit -m 'I made some changes'
    git push origin source
    grunt
    ```

8. This will automatically build the site, and then deploy it to the master branch.

## Support

If you run into issues please contact <niftylettuce@gmail.com>.

## License

MIT
