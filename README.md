# react-markdown-wasm

A simple markdown renderer using [react-wasm-bridge](https://github.com/SpiderOak/react-wasm-bridge).

Right now this isn't ready for use, but you can build and run the benchmark tester.

## Testing

First, make sure you have all of these
things:

- yarn
- rust nightly
- wasm-bindgen

and run `make run`. Then open your browser to http://localhost:8080/. Click on the buttons to mount and render 100 test documents. Benchmark output is written to the JS console.

### Going faster

By default, the module builds in debug mode. Use `make run MODE=release` and
it'll build in release mode. If you've already built it, you'll have to `make
clean` or it won't rebuild.
