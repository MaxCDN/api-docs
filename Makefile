BIN=./node_modules/.bin/

# Build / Default Task
###
build: generate assets

# Assets
###
assets: js css

# ugily-js
###
UGLIFY_FILES=$(shell find ./public/js -type f -name '*.js' -and -not -name '*.min.js')
MINJS_FILES=$(UGLIFY_FILES:.js=.min.js)

js: $(MINJS_FILES)

%.min.js : %.js .PHONY
	# Minifying $@
	@if test "$(PRETTY)"; then \
		cp $< $@; \
	else \
		$(BIN)uglifyjs $< --output $@; \
	fi

# lessc
###
LESSC_FILES=$(shell find ./templates/ -type f -name '*.less')
MINCSS_FILES=$(LESSC_FILES:.less=.min.css)

css: $(MINCSS_FILES)

%.min.css : %.less .PHONY
	# Generating $@
	@$(BIN)lessc $(shell test "$(PRETTY)" || echo "-x") \
		$< \
		$@
	@mv $@ ./public/css/

# Generate
###
generate: .PHONY
	# Generating ./public/index.html
	@./scripts/generate.js $(shell test "$(PRETTY)" && echo "--pretty") \
		--source README.md \
		--template ./templates/index.jade \
		--config ./config/config.json \
		--output ./public/index.html

# Server
###
server: .PHONY
	NODE_ENV=.:${NODE_ENV} ./scripts/server.js

# Deploy
###
BRANCH=master

deploy:  .PHONY
	@git status | grep "working directory clean" || (echo "ERROR: You have uncommitted changes!"; git status; exit 1)
	git branch -D gh-pages
	git checkout -b gh-pages $(BRANCH)
	git rm -rf config scripts templates Instructions.md LICENSE Makefile package.json
	@for dir in $$(find public -type d); do \
		mkdir -v -p $$(echo $$dir | sed 's/public\///'); \
	done
	@for file in $$(find public -type f); do \
		git mv --force -v $$file $$(echo $$file | sed 's/public\///') || exit 1; \
	 done
	git add .
	git commit -m "Deploying to gh-pages."
	git push origin gh-pages --force
	git checkout $(BRANCH)

.PHONY:

