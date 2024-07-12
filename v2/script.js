let current_page = 1;
let total_pages = 2;

window.onload = function () {
  mountNews();
};

const getNews = async () => {
  let response = await fetch(
    `http://servicodados.ibge.gov.br/api/v3/noticias/?qtd=12&page=${current_page}`
  );
  news = await response.json();
  total_pages = news.totalPages;
  return news;
};

const mountNews = async () => {
  const news = await getNews();
  document.getElementById("current-page").innerText = `Página ${current_page}`;

  news.items.forEach((item, index) => {
    console.log(item);
    console.log(index);
    const title = document.getElementById(`title-${index + 1}`);
    title.innerText = item.titulo;

    const img = document.getElementById(`img-${index + 1}`);
    img.setAttribute(
      "src",
      `https://agenciadenoticias.ibge.gov.br/${
        JSON.parse(item.imagens).image_intro
      }`
    );

    const intro = document.getElementById(`intro-${index + 1}`);
    intro.innerText = item.introducao;

    const url = document.getElementById(`url-${index + 1}`);
    url.setAttribute("href", item.link);

    const date = document.getElementById(`date-${index + 1}`);
    date.innerText = item.data_publicacao;
  });
  document.getElementById("news").className = "main-content";
  document.getElementById("footer").className = "main-content";
};

const previousPage = () => {
  if (current_page > 1) {
    current_page--;
    mountNews();
  }
};

const nextPage = () => {
  if (current_page < total_pages) {
    current_page++;
    mountNews();
  }
};
