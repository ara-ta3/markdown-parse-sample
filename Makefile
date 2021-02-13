YARN=yarn
NODE=node

.PHONY: test

install:
	$(YARN) install

compile:
	$(YARN) run tsc

run: compile
	$(NODE) dist/main.js

compile/watch:
	$(YARN) run tsc/watch

test:
	$(YARN) test
