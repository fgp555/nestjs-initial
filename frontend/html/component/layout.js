/* 
    <!-- <script src="https://frankgp.com/component/stat.js"></script> -->
    <!-- <script src="https://frankgp.com/lib/js/loader.js"></script> -->
*/

// import.js
const jsFiles = [
  "/component/head.js",
  "/component/header.js",
  "/component/footer.js",
  // "https://frankgp.com/lib/js/youtube-embed.js",
  // Add more optional JS files here
];

jsFiles.forEach((jsFile) => {
  import(jsFile)
    // .then((module) => {
    //   console.log(`Successfully imported: ${jsFile}`);
    // })
    .catch((error) => {
      console.error(`Failed to import: ${jsFile}`, error);
    });
});

// Dynamically import CSS files
const cssFiles = [
  // "https://frankgp.com/icon/icomoon/style.css",
  "/component/global.css",
  // "https://frankgp.com/wp-assets/style/wp-content.css",
  // Add more CSS files here
];

cssFiles.forEach((cssFile) => {
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = cssFile;
  document.head.appendChild(linkElement);
});
