YARN=yarn
NODE=node

install:
	$(YARN) install

compile:
	$(YARN) run tsc

run: compile
	$(NODE) dist/main.js

compile/watch:
	$(YARN) run tsc/watch
