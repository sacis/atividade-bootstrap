const modalServico = document.getElementById('modalServico');
let servicoEscolhido = '';

modalServico.addEventListener('show.bs.modal', (event) => {
  const botao = event.relatedTarget;
  servicoEscolhido = botao.dataset.titulo;
  modalServico.querySelector('.modal-title').textContent = botao.dataset.titulo;
  modalServico.querySelector('.modal-body p').textContent = botao.dataset.descricao;
});

// espera o modal terminar de fechar antes de rolar até o formulário
document.getElementById('btnAgendar').addEventListener('click', () => {
  document.getElementById('servico').value = servicoEscolhido;
  modalServico.addEventListener('hidden.bs.modal', () => {
    document.getElementById('contato').scrollIntoView();
  }, { once: true });
});

const formContato = document.getElementById('formContato');

formContato.addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('msgEnviado').classList.remove('d-none');
  formContato.reset();
});
