.PHONY: run
run:
	yarn start

.PHONY: fmt
fmt:
	yarn format

.PHONY: check-fmt
check-fmt:
	yarn check-format

.PHONY: lint
lint:
	yarn check-lint

.PHONY: fix-lint
fix-lint:
	yarn lint

.PHONY: migrate
migrate:
	@echo "TODO"

.PHONY: check
check: check-fmt lint

.PHONY: e2e
e2e:
	yarn build:e2e
	yarn test:e2e