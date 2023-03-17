.PHONY: Makefile dotincludes check

dotincludes:
	mkdir -p build/html/docs/project/images
	cp -v docs/project/images/* build/html/docs/project/images

DOCKER_IMAGE ?= nordicsemiconductor/asset-tracker-cloud-docs/builder

docs/project/%.svg: docs/project/%.dot 
	docker run --rm -v ${PWD}:/workdir ${DOCKER_IMAGE} ./scripts/dot2svg.sh $< $@

RELEASE ?= 0.0.0-development
VERSION ?= saga

html: Makefile dotincludes docs/project/system-overview.svg schemas
	docker run --rm -v ${PWD}:/workdir -e RELEASE=$(RELEASE) -e VERSION=$(VERSION) ${DOCKER_IMAGE} ./scripts/sphinx.sh

schemas: docs/cloud-protocol/*.ts
	docker run --rm -v ${PWD}:/workdir ${DOCKER_IMAGE} /bin/bash -c 'npm ci && npx tsx ./scripts/generate-schemas.ts'

check:
	docker run --rm -v ${PWD}:/workdir -e RELEASE=$(RELEASE) ${DOCKER_IMAGE} rstcheck -r ./build/html