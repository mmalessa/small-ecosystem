-include .env

D = docker
DC = docker compose --project-directory=. --file=./docker-compose.yaml

.DEFAULT_GOAL = help

.PHONY: help
help:
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' Makefile | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

### PREPARE
.PHONY: build
build:
	@test -f ./.env || (cp ./.env.dist ./.env; echo "\n*** .env was created - Customize it! ***\n"; exit 1)
	$(DC) build

### RUN
.PHONY: up
up:
	$(DC) up -d

.PHONY: down
down:
	$(DC) down


### DEV
.PHONY: angular-console
angular-console:
	$(DC) exec -it angular bash

.PHONY: angular-serve
angular-serve:
	$(DC) exec -it angular bash -c "cd frontend && ng serve --host 0.0.0.0"

