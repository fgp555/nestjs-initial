let fgp_header_html = /* html */ `<section>
  <div class="btn_container">
    <div class="logo">
      <i class="btn_navbar icon-menu"></i>
      <h2>
        <a href="/">App<span class="mobile-none">-project</span></a>
      </h2>
    </div>

  </div>
  <nav>
    <ul id="navbar" class="display_none">
      <li><a href="./">Home</a></li>
      <li><a href="./">Users Management</a></li>
    </ul>
  </nav>
</section>
<!-- html. -->
`;

let fgp_header_css = /* html */ `
<style>
@import url(https://frankgp.com/icon/icomoon/style.css);
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap");

fgp_header {
  display: block;
  color: white;
  background: indigo;
  padding: 1em;
  /* font: inherit; */
  font-family: "Work Sans", sans-serif;

}
* {
  /* border: 1px dashed #0808; */
  margin: 0;
  box-sizing: border-box;
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: white
}
ul {
  padding: 1em 0;
}
ul li {
  list-style: none;
  padding: 0 3vw;
  font-size: 1.2em;
  margin-top:0.8em;
}
.btn_container {
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
}
.btn_container .logo {
  display: flex;
  align-items: center;
  gap: 3em;
}
.btn_navbar {
  cursor: pointer;
  font-size: 1.5em;
}
.display_none {
  display: none;
}

.searchInput {
  outline: none;
  border-radius: 1em;
  border: none;
  padding: 0.6em 0 0.6em 2.5em;
  width: 100%;
}
.search_container {
  position: relative;
}
.search_container i {
  position: absolute;
  left: 0.5em;
  color: #0008;
  top: 50%;
  transform: translateY(-50%);
}
/* css. */

@media (max-width: 30rem) {

  .mobile-none {
    display: none;
  }
}
</style>
`;

// ========== fgp_header ==========
var fgp_header = document.querySelector("fgp_header");

if (!fgp_header) {
  fgp_header = document.createElement("fgp_header");
  fgp_header.id = "fgp_header";
  document.body.insertAdjacentElement("afterbegin", fgp_header);
}

fgp_header.innerHTML = fgp_header_css + fgp_header_html;

// ========== button nav ==========
const btn_navbar = document.querySelector(".btn_navbar");
btn_navbar.addEventListener("click", () => {
  btn_navbar.classList.toggle("icon-menu");
  btn_navbar.classList.toggle("icon-close");

  const navbar = document.querySelector("#navbar");
  navbar.classList.toggle("display_none");
});

// ========== Search ==========
let searchInput = document.querySelector(".searchInput");
searchInput.onchange = () => {
  const url = `https://www.youtube.com/results?search_query=${searchInput.value}%20Frank%20GP`;
  // window.open(url, '_blank');
  window.location.href = url;
  // console.log(url);
};
