.PHONY: run
run:
	yarn start

.PHONY: fmt
fmt:
	yarn format --write .

.PHONY: check-fmt
check-fmt:
	yarn format --check .

.PHONY: lint
lint:
	yarn eslint

.PHONY: fix-lint
fix-lint:
	yarn eslint --fix

.PHONY: check
check: check-fmt lint
