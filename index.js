import React from 'react';
import ReactWasmBridge from 'react-wasm-bridge';

let mdModule;
let modulePromise;

export default class MarkdownWasm extends React.PureComponent {
  constructor() {
    super();

    if (!mdModule) {
      if (!modulePromise) {
        modulePromise = import('./react_markdown_wasm');
      }
      modulePromise.then(m => {
        mdModule = m;
        this.setState({ moduleLoaded: true });
      }).catch(e => {
        console.error(e);
      });

      this.state = {
        moduleLoaded: false
      };
    } else {
      this.state = {
        moduleLoaded: true
      }
    }
  }

  render() {
    const { children } = this.props;
    const { moduleLoaded } = this.state;
    if (!moduleLoaded) {
      return null;
    }

    return <ReactWasmBridge module={ mdModule } message={ children } method="dom" />;
  }
}
