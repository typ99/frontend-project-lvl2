install:
	npm ci
stringify:
	node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json
json:
	node bin/gendiff.js --format json __fixtures__/file1.json __fixtures__/file2.json
plain:
	node bin/gendiff.js --format plain __fixtures__/file1.json __fixtures__/file2.json
yml:
	node bin/gendiff.js __fixtures__/file1.yml __fixtures__/file2.yml
lint:
	npx eslint --fix .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
publish:
	npm publish --dry-run