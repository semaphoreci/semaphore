.PHONY: build dev test

dev:
	npm start

test:
	npm test

build:
	npm run build

build.image: build
	docker build -t $(IMAGE):$(IMAGE_TAG) . -f Dockerfile
