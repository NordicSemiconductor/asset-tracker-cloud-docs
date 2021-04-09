const template = (redirect) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="application-name"
      content="nRF Asset Tracker Documenation"
    />
    <title>nRF Asset Tracker Documenation</title>
    <meta
      http-equiv="refresh"
      content="0; URL=${redirect}"
    />
  </head>
  <body>
    If you are not getting redirected, please click <a href="${redirect}">this link</a>.
  </body>
</html>`;

process.stdout.write(template(process.env.REDIRECT));
