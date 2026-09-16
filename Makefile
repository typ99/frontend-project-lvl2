install:
	npm ci
publish:
	npm publish --dry-run
lint:
	oxlint
test:
	npm test
test-coverage:
	npm run test-coverage