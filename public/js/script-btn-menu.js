btn_menu = document.getElementsByClassName("btn-menu");

let btn_meu_perfio = document.getElementsByClassName("btn-menu");
let btn_historico = document.getElementsByClassName("btn-menu");
let btn_local_salvo = document.getElementsByClassName("btn-menu");

function botao_menu(){
    const barra_opcao_menu = document.getElementById("menu-container");
    const b_opcao_menu = document.getElementById("btn-menu");
    const alturaAtual = getComputedStyle(barra_opcao_menu).height;

    const largura = window.innerWidth;
    if(largura >= 450){
        if (alturaAtual === "160px") {
            barra_opcao_menu.style.height = "0px"; // ou qualquer valor para "fechar"
            barra_opcao_menu.style.display = "none";
            b_opcao_menu.style.borderRadius = "30px 30px 30px 30px";}
        else {
            b_opcao_menu.style.borderRadius = "30px 30px 0px 0px";
            barra_opcao_menu.style.display = "block";
            barra_opcao_menu.style.height = "160px"; // "abrir" 
    }
    }else if(largura <= 450){
        console
        barra_opcao_menu.style.height = "30px";
    }
}

let estado_menu = false;

function menu() {
    const largura = window.innerWidth;
    const mn = document.getElementById("aba-menu");
    const barra_opcao_menu = document.getElementById("menu-container");
    const btn_menu = document.getElementById("btn-menu");

    if (!estado_menu) {
        mn.style.display = "block";
        if (largura >= 450 && estado_menu == false) {
            barra_opcao_menu.style.left = "315px";
            btn_menu.style.left = "243px";
        }
        estado_menu = true;
    } else {
        mn.style.display = "none";
        barra_opcao_menu.style.left = "5px";
        btn_menu.style.left = "-67px";
        if (largura <= 450 && estado_menu == true) {
            barra_opcao_menu.style.left = "0px";
            btn_menu.style.left = "-67px";
        }
        estado_menu = false;
    }

    return estado_menu;
}

// Adiciona apenas UMA VEZ o evento de redimensionamento
window.addEventListener("resize", () => {
    if (estado_menu) {
        menu(); // fecha se já estiver aberto
    }
});

function btn_click(id_btn,idAba) {
    const btn = document.querySelectorAll(".myButton-m");
    btn.forEach(btn => btn.classList.remove('ativo'))
    id_btn.classList.add('ativo')
    menu()

    // oculta abas
    const abas = document.querySelectorAll('.titulo-menu');
    abas.forEach(aba => aba.style.display = 'none');

    // Exibe a aba correspondente
    const abaSelecionada = document.getElementById(idAba);
    abaSelecionada.style.display = 'block';
}

function ajustarLayout() {
    const largura = window.innerWidth;
    if (largura <= 450) {
        const barra_opcao_menu = document.getElementById("menu-container");
        barra_opcao_menu.style.left = "0px";
        barra_opcao_menu.style.height = "30px";
        barra_opcao_menu.style.display = "grid";
        barra_opcao_menu.style.gridTemplateColumns = "1fr 1fr 1fr";
    } else{
        const barra_opcao_menu = document.getElementById("menu-container");
        const b_opcao_menu = document.getElementById("btn-menu");

        barra_opcao_menu.style.left = "5px";
        barra_opcao_menu.style.display = "none";
        b_opcao_menu.style.borderRadius = "30px 30px 30px 30px";}
  }
  
  // Chama na carga da página
  ajustarLayout();
  
  // Atualiza ao redimensionar
  window.addEventListener("resize", ajustarLayout);