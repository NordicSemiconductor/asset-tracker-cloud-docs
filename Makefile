.PHONY: Makefile dotincludes

dotincludes:
	mkdir -p build/html/docs/project/images
	cp -v docs/project/images/* build/html/docs/project/images

DOCKER_IMAGE ?= nordicsemiconductor/asset-tracker-cloud-docs/graphviz

docs/project/%.svg: docs/project/%.dot 
	docker run --rm -v ${PWD}:/workdir ${DOCKER_IMAGE} /bin/dot2svg.sh $< $@

RELEASE ?= 0.0.0-development
VERSION ?= saga
AUDIENCE ?= saga

html: Makefile dotincludes docs/project/system-overview.svg docs/project/system-overview-v1.5.x.svg
	RELEASE=$(RELEASE) VERSION=$(VERSION) AUDIENCE=$(AUDIENCE) ./scripts/sphinx.sh
	find docs -type f -name \*.json | xargs -I@ cp -v @ build/html/@
