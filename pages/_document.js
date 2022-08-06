import Document, { Html, Head, Main, NextScript } from 'next/document'

class TypingApp extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link 
          href="https://fonts.googleapis.com/css2?family=Comforter&family=Oswald:wght@200;300;400;500;600;700&display=swap" 
          rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default TypingApp;