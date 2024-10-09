// Check if the element with id "title" exists
var titleTag = document.title;

// If the element doesn't exist, create it and set innerHTML
if (!titleTag) {
  var title = "<title>Frank GP — Developer</title>";
  document.head.insertAdjacentHTML("beforeend", title);
}

document.head.innerHTML += /* html */ `<!-- Meta -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="icon" href="https://frankgp.com/favicon.ico" sizes="256x256" />
<meta name="theme-color" content="#347" />
<meta name="author" content="Frank GP" />
<meta name="site_locale" content="en_PE" />

<!-- SEO -->
<meta name="robots" content="index" />
<meta name="description" content="Research, design and development" />

<!-- Open Graph tags -->
<meta property="og:title" content="Frank GP — Developer | PERU" />
<meta property="og:site_name" content="Frank GP — Developer | PERU" />
<meta property="og:description" content="Research, design and development | PERU" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://frankgp.com" />
<meta property="og:image" content="https://i.postimg.cc/TY98Prbd/fb-cover.webp" />
<meta property="og:image:width" content="600" />
<meta property="og:image:height" content="314" />
<meta property="fb:app_id" content="1526445401046904" />
`;
