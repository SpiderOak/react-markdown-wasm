import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownWasm from './';
import MarkdownIt from 'markdown-it';

class Markdown extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      md: new MarkdownIt(),
    };
  }

  render() {
    const { children } = this.props;
    const { md } = this.state;

    const mdText = md.render(children);

    return <div dangerouslySetInnerHTML={ {__html: mdText } } />;
  }
}

const corpus = `
# Header
## Header
### Header
#### Header
##### Header
###### Header

---

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa



1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

[SpiderOak](http://spideroak.com)
`;

function range(n) {
  const l = [];
  for (let i = 0; i < n; i++) {
    l.push(i);
  }
  return l;
}

class Timer extends React.PureComponent {
  componentWillMount() {
    this.t0 = performance.now();
  }

  componentDidMount() {
    const { end } = this.props;

    console.log('rendering', this.displayName, 'took', performance.now() - this.t0, 'ms');
  }
}

class MarkdownItTimer extends Timer {
  displayName = 'MarkdownItTimer';

  render() {
    return <td>{ range(100).map( i => <Markdown key={ i }>{ corpus }</Markdown> ) }</td>;
  }
}

class MarkdownWasmTimer extends Timer {
  displayName = 'MarkdownWasmTimer';

  render() {
    return <td>{ range(100).map( i => <MarkdownWasm key={ i }>{ corpus }</MarkdownWasm> ) }</td>;
  }
}

class Perf extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showing: true,
      Component: MarkdownWasmTimer,
    }
  }

  startBench = Component => () => {
    this.setState({
      showing: false,
    });

    setTimeout(() => {
      this.setState({
        showing: true,
        Component,
      });
    }, 200);
  }

  render() {
    const { showing, Component } = this.state;

    return <div>
      <button onClick={ this.startBench(MarkdownItTimer) }>Bench markdown-it</button>
      <button onClick={ this.startBench(MarkdownWasmTimer) }>Bench react-markdown-wasm</button>
      <div>
        { showing && <Component /> }
      </div>
    </div>;
  }
}

window.addEventListener('load', function() {
  const content = document.getElementById('content');
  ReactDOM.render(<Perf />, content);
});
