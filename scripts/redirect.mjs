const template = (redirect) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="application-name"
      content="nRF Asset Tracker Documenation"
    />
    <title>nRF Asset Tracker Documenation</title>
    <!-- Fallback redirect without JavaScript -->
    <meta
      http-equiv="refresh"
      content="10; URL=${redirect}"
    />
    <!-- Preserve hashes -->
    <script>
      window.location.href="${redirect}" + window.location.hash;
    </script>
  </head>
  <body>
    If you are not getting redirected, please click <a href="${redirect}">this link</a>.
  </body>
</html>`;

process.stdout.write(template(process.env.REDIRECT));
