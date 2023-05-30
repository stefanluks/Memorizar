const icone_som = {
    ativado: `<i class="bi bi-volume-up-fill"></i>`,
    desativado: `<i class="bi bi-volume-mute-fill"></i>`
}

window.onload = () => {
    const btnMenu = document.getElementById("btnMenu");
    const btnJogar = document.getElementById("btnJogar");
    const btnOp = document.getElementById("btnOp");
    const btnSom = document.getElementById("btnSom");
    const btnES = document.getElementById("btnES");
    const btnVoltar = document.getElementById("btnVoltar");
    const corpoMenu = document.getElementById("corpo-menu");

    let Efeito_sonoro = true;
    let musica = true;

    btnMenu.addEventListener("click", () => {
        btnMenu.classList.add("hidden");
        btnJogar.classList.remove("hidden");
        btnOp.classList.remove("hidden");
        btnSom.classList.add("hidden");
        btnES.classList.add("hidden");
        btnVoltar.classList.add("hidden");
        document.querySelector(".base-caixas").remove();
    });

    btnJogar.addEventListener("click", () => {
        btnMenu.classList.remove("hidden");
        btnJogar.classList.add("hidden");
        btnOp.classList.add("hidden");
        btnSom.classList.add("hidden");
        btnES.classList.add("hidden");
        btnVoltar.classList.add("hidden");
        Jogo();
    });

    btnOp.addEventListener("click", () => {
        btnJogar.classList.add("hidden");
        btnOp.classList.add("hidden");
        btnSom.classList.remove("hidden");
        btnES.classList.remove("hidden");
        btnVoltar.classList.remove("hidden");
    });

    btnVoltar.addEventListener("click", () => {
        btnJogar.classList.remove("hidden");
        btnOp.classList.remove("hidden");
        btnSom.classList.add("hidden");
        btnES.classList.add("hidden");
        btnVoltar.classList.add("hidden");
    });

    btnES.addEventListener("click", () => {
        Efeito_sonoro = !Efeito_sonoro;
        if(Efeito_sonoro) btnES.innerHTML = `<span>Efeito Sonoro </span>`+icone_som.ativado;
        else btnES.innerHTML = `<span>Efeito Sonoro </span>`+icone_som.desativado;
    });

    btnSom.addEventListener("click", () => {
        musica = !musica;
        if(musica) btnSom.innerHTML = `Música `+icone_som.ativado;
        else btnSom.innerHTML = `Música `+icone_som.desativado;
    });

    function GerarSequencia(){
        lista = [];
        for(let x=0; x < 9; x++){
            lista.push(Math.floor(Math.random() * 9))
        }
        return lista
    }

    function Jogo(){
        let lista = [];
        let limitador = 1;
        let sequencia = GerarSequencia();
        console.log(sequencia)
        let base = document.createElement("div");
        base.className = "base-caixas";
        for(let i=0; i < 9; i++){
            let div = document.createElement("div");
            div.className = "caixa";
            div.addEventListener("click", () => {
                if(aguardando){
                    div.classList.add("click");
                    CliqueCaixa(i)
                }
            });
            base.appendChild(div);
            lista.push(div);
        }
        corpoMenu.appendChild(base);
        
        let aguardando = false;
        let cont = 0;
        let x = 0;
        let time = setInterval(()=>{
            if(!aguardando ){
                lista.forEach(d => d.classList.remove("click"))
                if(cont < limitador){
                    if(x < 2){
                        lista[sequencia[cont]].classList.toggle("ativar");
                        x++;
                    }else{
                        lista[sequencia[cont]].classList.remove("ativar");
                        x=0;
                        cont++;
                    }
                }else{
                    aguardando = true;
                }
            }
        }, 500);
        
        let y = 0;
        function CliqueCaixa(clicada){
            if(y < limitador){
                let n = sequencia[y];
                if(clicada === n){
                    console.log(y, clicada);
                    y++;
                    if(y === limitador){
                        aguardando = false;
                        cont = 0;
                        y = 0;
                        limitador++;
                    }
                }else{
                    corpoMenu.querySelector(".base-caixas").classList.add('bg-red')
                    alert("ERRO!!");
                    btnMenu.click();
                    btnJogar.click();
                }
            }
        }
    }
}