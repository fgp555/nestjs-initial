/*
    <script src="https://frankgp.com/component/fgp_footer.js"></script>
    <header-component></header-component>
*/

let fgp_footer_html = /*html */ `
<!-- html... -->
<p>Create by Frank GP</p>
<!-- html. -->
`;

let fgp_footer_css = /*html */ `<style>
  html,
  body {
    height: 100%;
    margin: 0;
  }

  body {
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }

  header,
  fgp_footer {
    background-color: indigo;
    color: white;
    padding: 1rem 5vw;
  }
  fgp_footer {
    text-align: center;
    min-height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<!-- html. -->
`;

// ========== fgp_footer ==========
var fgp_footer = document.querySelector("fgp_footer");

if (!fgp_footer) {
  fgp_footer = document.createElement("fgp_footer");
  fgp_footer.id = "fgp_footer";
  document.body.insertAdjacentElement("beforeend", fgp_footer);
}

fgp_footer.innerHTML = fgp_footer_css + fgp_footer_html;
