TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
TIMEOUT = 5000
MOCHA_OPTS =
REPORTER = tap
PROJECT_DIR = $(shell pwd)
NPM_INSTALL_PRODUCTION = PYTHON=`which python2.6` NODE_ENV=production npm install 
NPM_INSTALL_TEST = PYTHON=`which python2.6` NODE_ENV=test npm install 

install:
	@$(NPM_INSTALL_PRODUCTION)

install-test:
	@$(NPM_INSTALL_TEST)

test: install-test
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) --timeout $(TIMEOUT) $(MOCHA_OPTS) $(TESTS)

test-cov:
	@rm -f coverage.html
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=html-cov > coverage.html
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=travis-cov
	@ls -lh coverage.html

test-all:
	@$(MAKE) test
	@$(MAKE) test-cov
clean:
	@rm -f coverage.html

.PHONY: install install-test test test-cov clean toast test-all
