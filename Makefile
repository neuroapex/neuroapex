default: node_modules 
	npm start

node_modules:
	npm install

clean:
	rm -rf node_modules
	rm -rf public
	rm -rf .cache
