let page = 1;
let qtd = 10;
let total_pages = 2;

window.onload = function () {
  mountNews();
};

async function getNews(qtd, page) {
  let news = await fetch(
    `http://servicodados.ibge.gov.br/api/v3/noticias/?qtd=${qtd}&page=${page}`
  );
  response = await news.json();
  total_pages = response.totalPages;
  updatePageNumber();
  return response;
}

const mountNews = async () => {
  let news = await getNews(qtd, page);
  console.log(news);
  let section = document.getElementById("news");

  news.items.forEach((item) => {
    let titulo = document.createElement("h2");
    titulo.appendChild(document.createTextNode(item.titulo));
    section.appendChild(titulo);

    let outer_div = document.createElement("div");
    outer_div.setAttribute("class", "outer_div");
    section.appendChild(outer_div);

    let img = document.createElement("img");
    img.setAttribute(
      "src",
      `https://agenciadenoticias.ibge.gov.br/${
        JSON.parse(item.imagens).image_intro
      }`
    );
    outer_div.appendChild(img);

    let inner_div = document.createElement("div");
    inner_div.setAttribute("class", "inner_div");
    outer_div.appendChild(inner_div);

    let intro = document.createElement("p");
    intro.appendChild(document.createTextNode(item.introducao));
    inner_div.appendChild(intro);

    let a = document.createElement("a");
    a.setAttribute("href", item.link);
    a.innerText = "Leia a notícia na integra";
    a.setAttribute("target", "_blank");
    inner_div.appendChild(a);
  });
};

const nextPage = () => {
  if (page < total_pages) {
    page++;
    let section = document.getElementById("news");
    section.innerHTML = "";
    mountNews();
  }
};

const previousPage = () => {
  if (page > 1) {
    page--;
    let section = document.getElementById("news");
    section.innerHTML = "";
    mountNews();
  }
};

const updatePageNumber = () => {
  let page_number = document.getElementById("page_number");
  page_number.innerText = `Página ${page} de ${total_pages}`;
};
