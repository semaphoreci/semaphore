.PHONY: build dev test

BRANCH=$(shell echo "$(SEMAPHORE_GIT_BRANCH)" | sed 's/[^a-z]//g')
IMAGE="us.gcr.io/semaphore2-prod/docs-v2"
IMAGE_TAG="$(BRANCH)-$(SEMAPHORE_WORKFLOW_ID)-sha-$(SEMAPHORE_GIT_SHA)"

dev:
	npm start

test:
	npm test

build:
	npm run build

configure.gcloud:
	gcloud auth activate-service-account $(GCP_REGISTRY_WRITER_EMAIL) --key-file ~/gce-registry-writer-key.json
	gcloud --quiet auth configure-docker

nginx.build: build
	docker build --cache-from $(IMAGE):latest -t $(IMAGE) . -f Dockerfile

nginx.test:
	docker run --rm -t -a stdout $(IMAGE) nginx -c /etc/nginx/nginx.conf -t

nginx.push:
	docker tag $(IMAGE):latest $(IMAGE):$(IMAGE_TAG)
	docker push $(IMAGE):$(IMAGE_TAG)
	docker push $(IMAGE):latest
