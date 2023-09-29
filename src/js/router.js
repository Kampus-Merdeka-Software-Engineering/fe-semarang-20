const loadPage = async (pageName) => {
  try {
    const data = await fetch(pageName + ".html");
    const response = await data.text();
    document.body.innerHTML = response;
    history.pushState({}, null, pageName);
  } catch (error) {
    console.error("Error loading page", error);
  }
};

window.addEventListener("popstate", function (event) {
  loadPage(window.location.pathname.substr(1) || "index");
});

const initialPage = window.location.pathname.substr(1) || "index";
loadPage(initialPage);
