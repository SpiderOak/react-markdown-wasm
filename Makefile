MODE ?= debug
CARGO_BUILD_FLAGS =
NODE_ENV = development
ifeq ($(MODE),release)
  CARGO_BUILD_FLAGS += --release
  NODE_ENV = production
endif
export NODE_ENV

.PHONY: all
all: dist/index.js

.PHONY: run
run: all
	npm start

dist/index.js: node_modules index.js react_markdown_wasm.js demo.js
	npx webpack

node_modules: package.json yarn.lock

yarn.lock:
	yarn

react_markdown_wasm.js: src/*.rs
	cargo build $(CARGO_BUILD_FLAGS) --target wasm32-unknown-unknown
	wasm-bindgen target/wasm32-unknown-unknown/$(MODE)/react_markdown_wasm.wasm --out-dir .

.PHONY: clean
clean:
	-rm react_markdown_wasm.js react_markdown_wasm_bg.wasm react_markdown_wasm.d.ts dist/index.js dist/*.wasm
