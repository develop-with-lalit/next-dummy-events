const {
  default: Document,
  Html,
  Head,
  Main,
  NextScript,
} = require("next/document");

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays"></div>
          <Main />
          {/* Main is used to render app */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
