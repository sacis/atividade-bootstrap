const btnMenu = document.getElementById('btnMenu');
const menu = document.getElementById('menu');

btnMenu.addEventListener('click', () => {
  const aberto = menu.classList.toggle('hidden') === false;
  btnMenu.setAttribute('aria-expanded', aberto);
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.add('hidden');
    btnMenu.setAttribute('aria-expanded', false);
  });
});

const slides = document.getElementById('slides');
const pontos = document.querySelectorAll('.ponto');
const totalSlides = pontos.length;
let slideAtual = 0;
let timer;

function mostrarSlide(indice) {
  slideAtual = (indice + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${slideAtual * 100}%)`;
  pontos.forEach((ponto, i) => {
    ponto.classList.toggle('opacity-50', i !== slideAtual);
    ponto.setAttribute('aria-current', i === slideAtual);
  });
}

function reiniciarTimer() {
  clearInterval(timer);
  timer = setInterval(() => mostrarSlide(slideAtual + 1), 5000);
}

document.querySelectorAll('.seta').forEach((seta) => {
  seta.addEventListener('click', () => {
    mostrarSlide(slideAtual + Number(seta.dataset.direcao));
    reiniciarTimer();
  });
});

pontos.forEach((ponto, i) => {
  ponto.addEventListener('click', () => {
    mostrarSlide(i);
    reiniciarTimer();
  });
});

mostrarSlide(0);
reiniciarTimer();

const modal = document.getElementById('modalServico');
let servicoEscolhido = '';

document.querySelectorAll('.abrir-modal').forEach((botao) => {
  botao.addEventListener('click', () => {
    servicoEscolhido = botao.dataset.titulo;
    document.getElementById('modalServicoTitulo').textContent = botao.dataset.titulo;
    document.getElementById('modalServicoTexto').textContent = botao.dataset.descricao;
    modal.showModal();
  });
});

modal.querySelectorAll('.fechar-modal').forEach((botao) => {
  botao.addEventListener('click', () => modal.close());
});

// clique no fundo escuro: o alvo é o próprio <dialog>, não o conteúdo
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

document.getElementById('btnAgendar').addEventListener('click', () => {
  document.getElementById('servico').value = servicoEscolhido;
  modal.close();
  document.getElementById('contato').scrollIntoView();
});

const formContato = document.getElementById('formContato');

formContato.addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('msgEnviado').classList.remove('hidden');
  formContato.reset();
});
