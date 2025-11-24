    //Troca de usuario
    function fazerLogout() {
        localStorage.removeItem("usuarioLogado");
        location.reload(); // recarrega a página e volta pro login
      }
      
          // Recupera o nome do usuário logado no localStorage
          let usuarioLogado = localStorage.getItem("usuarioLogado");
      
          // Exibe ou oculta as áreas conforme o login
          if (!usuarioLogado) {
            document.getElementById("login-container").style.display = "block";
            document.getElementById("app").style.display = "none";
          } else {
            document.getElementById("login-container").style.display = "none";
            document.getElementById("app").style.display = "block";
            document.getElementById("barra-usuario").style.display = "block";
            document.getElementById("usuario-nome").textContent = usuarioLogado;
          }
      
          // Função chamada ao clicar em "Entrar" no login fictício
          function fazerLogin() {
            const nome = document.getElementById("nome-usuario").value.trim();
            if (nome) {
              localStorage.setItem("usuarioLogado", nome);
              location.reload(); // recarrega a página para aplicar o login
            } else {
              alert("Digite seu nome para continuar!");
            }
          }
      
          // Seleção de elementos do DOM
          const form = document.getElementById("form-publicar");
          const lista = document.getElementById("lista-publicacoes");
          const btnPublicar = document.getElementById("btn-publicar");
          const contador = document.getElementById("contador");
      
          // Carrega publicações do localStorage ou inicia vazio
          let publicacoes = JSON.parse(localStorage.getItem("publicacoes")) || [];
          let editandoIndex = null; // Controla se está editando
      
          // Função para formatar data/hora atual
          function formatarDataHora(data) {
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const ano = data.getFullYear();
            const hora = String(data.getHours()).padStart(2, '0');
            const minutos = String(data.getMinutes()).padStart(2, '0');
            return `${dia}/${mes}/${ano} às ${hora}:${minutos}`;
          }
      
          // Atualiza contador de palavras/caracteres ao digitar
          document.getElementById("conteudo").addEventListener("input", () => {
            const texto = document.getElementById("conteudo").value;
            const palavras = texto.trim().split(/\s+/).filter(Boolean).length;
            const caracteres = texto.length;
            contador.textContent = `Palavras: ${palavras} | Caracteres: ${caracteres}`;
          });
      
          // Renderiza todas as publicações salvas na tela
          function renderizarPublicacoes() {
            lista.innerHTML = ""; // limpa antes de renderizar
      
            publicacoes.forEach((pub, index) => {
              const card = document.createElement("div");
              card.className = "card mb-3";
      
              card.innerHTML = `
                <div class="card-body">
                  <h5 class="card-title">${pub.titulo}</h5>
                  <p class="card-text">${pub.conteudo}</p>
                  <p class="text-muted small mb-1">Autor: ${pub.autor}</p>
                  <p class="text-muted small">
                    Publicado em: ${pub.dataHoraCriacao}
                    ${pub.dataHoraEdicao ? `<br>Editado em: ${pub.dataHoraEdicao}` : ""}
                  </p>
                  ${pub.autor === usuarioLogado ? `
                    <button class="btn btn-sm btn-warning me-2" onclick="editarPublicacao(${index})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="excluirPublicacao(${index})">Excluir</button>
                  ` : ""}
                </div>
              `;
      
              lista.appendChild(card);
            });
          }
      
          // Exclui publicação por índice
          function excluirPublicacao(index) {
            if (confirm("Tem certeza que deseja excluir essa publicação?")) {
              publicacoes.splice(index, 1);
              localStorage.setItem("publicacoes", JSON.stringify(publicacoes));
              renderizarPublicacoes();
            }
          }
      
          // Carrega dados para edição
          function editarPublicacao(index) {
            const pub = publicacoes[index];
            document.getElementById("titulo").value = pub.titulo;
            document.getElementById("conteudo").value = pub.conteudo;
            contador.textContent = `Palavras: ${pub.conteudo.trim().split(/\s+/).filter(Boolean).length} | Caracteres: ${pub.conteudo.length}`;
            editandoIndex = index;
            btnPublicar.textContent = "Salvar Edição";
          }
      
          // Trata envio do formulário para publicar ou editar
          form.addEventListener("submit", (e) => {
            e.preventDefault(); // evita recarregar
            const titulo = document.getElementById("titulo").value;
            const conteudo = document.getElementById("conteudo").value;
            const agora = formatarDataHora(new Date());
      
            if (editandoIndex === null) {
              publicacoes.push({
                titulo,
                conteudo,
                autor: usuarioLogado,
                dataHoraCriacao: agora,
                dataHoraEdicao: null
              });
            } else {
              publicacoes[editandoIndex].titulo = titulo;
              publicacoes[editandoIndex].conteudo = conteudo;
              publicacoes[editandoIndex].dataHoraEdicao = agora;
              editandoIndex = null;
              btnPublicar.textContent = "Publicar";
            }
      
            localStorage.setItem("publicacoes", JSON.stringify(publicacoes));
            renderizarPublicacoes();
            form.reset();
            contador.textContent = "";
          });
      
          // Inicializa renderização ao carregar a página
          renderizarPublicacoes();