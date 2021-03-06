const projectName = 'markdown-previewer';
marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  } });

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMax: false,
      previewMax: false };

    this.handleChangeInMarkDown = this.handleChangeInMarkDown.bind(this);
    this.handleEditorMax = this.handleEditorMax.bind(this);
    this.handlePreviewMax = this.handlePreviewMax.bind(this);
  }
  handleChangeInMarkDown(e) {
    this.setState({
      markdown: e.target.value });

  }
  handleEditorMax() {
    this.setState({
      editorMax: !this.state.editorMax });

  }
  handlePreviewMax() {
    this.setState({
      previewMax: !this.state.previewMax });

  }
  render() {
    const classes = this.state.editorMax ?
    ['editorWrap maximized', 'previewWrap hide', 'fa fa-compress'] :
    this.state.previewMax ?
    ['editorWrap hide', 'previewWrap maximized', 'fa fa-compress'] :
    ['editorWrap', 'previewWrap', 'fa fa-arrows-alt'];
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: classes[0] }, /*#__PURE__*/
      React.createElement(Toolbar, {
        icon: classes[2],
        onClick: this.handleEditorMax,
        text: "Editor" }), /*#__PURE__*/

      React.createElement(Editor, { markdown: this.state.markdown, onChange: this.handleChangeInMarkDown })), /*#__PURE__*/

      React.createElement("div", { className: "converter" }), /*#__PURE__*/
      React.createElement("div", { className: classes[1] }, /*#__PURE__*/
      React.createElement(Toolbar, {
        icon: classes[2],
        onClick: this.handlePreviewMax,
        text: "Previewer" }), /*#__PURE__*/

      React.createElement(Preview, { markdown: this.state.markdown }))));



  }}


const Toolbar = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "toolbar" }, /*#__PURE__*/
    React.createElement("i", { className: "fa fa-random", title: "mallovelli" }),
    props.text, /*#__PURE__*/
    React.createElement("i", { className: props.icon, onClick: props.onClick })));


};

const Editor = props => {
  return /*#__PURE__*/(
    React.createElement("textarea", {
      id: "editor",
      onChange: props.onChange,
      type: "text",
      value: props.markdown }));


};

const Preview = props => {
  return /*#__PURE__*/(
    React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: marked(props.markdown, { renderer: renderer }) },

      id: "preview" }));


};

const placeholder = `
# Welcome to my mark down previewer

## Sub heading for my Mark down previewer

Alternatively, for H1 and H2, an underline-ish style:
Alt-H1
======
Alt-H2
------

[links] links
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links. 
http://www.example.com or <http://www.example.com> and sometimes 
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

Images:
Here's our logo (hover to see the title text):

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

A blockquote:
> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 

A list Item:
1. First ordered list item
2. Another item
??????* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
??????1. Ordered sub-list
4. And another item.

?????????You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

?????????To have a line break without a paragraph, you will need to use two trailing spaces.??????
?????????Note that this line is separate, but within the same paragraph.??????
?????????(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses

A bolded text:
Strong emphasis, aka bold, with **asterisks** or __underscores__.
inline code: 
Inline \`code\` has \`back-ticks around\` it.

codeblock:
\`\`\`javascript
var s = "JavaScript syntax highlighting";
alert(s);
\`\`\`
 
\`\`\`python
s = "Python syntax highlighting"
print s
\`\`\`
 
\`\`\`
No language indicated, so no syntax highlighting. 
But let's throw in a <b>tag</b>.
\`\`\`

`;

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));