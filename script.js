let seuVotoPara = document.querySelector('.d-1 span');
let cargo = document.querySelector('.d-2 span');
let descricao = document.querySelector('.d-4 span');
let aviso = document.querySelector('.bottom-screen');
let lateral = document.querySelector('.top--right');
let numeros = document.querySelector('.d-3');
let pressedKey = document.querySelectorAll('.keyboard--button');

let etapaAtual = 0;
let numero = ''
let votoBranco = false;

function iniciarEtapa(){
    let etapa = etapas[etapaAtual];

    descricao.classList.remove('aviso', 'pisca');
    votoBranco = false;

    numero = '';

    let numeroHtml = '';

    for(let i=0;i<etapa.numeros;i++){
        if(i==0){
            numeroHtml += '<div class="number pisca"></div>'
        }else{
            numeroHtml += '<div class="number"></div>'
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function updateInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.num === numero){
            return true;
        }else{
            return false
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        if(etapaAtual == 0){
            descricao.innerHTML =  `Nome: ${candidato.nome}<br/>
                                    Partido: ${candidato.partido}`;
        }else{
            descricao.innerHTML =  `Nome: ${candidato.nome}<br/>
                                    Partido: ${candidato.partido}<br/>
                                    Vice-prefeito: ${candidato.vice}`;
        }
        let fotosHtml = ''
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml+=`<div class="candidates small">
                                <img src="/images/${candidato.fotos[i].url}">
                                <span>${etapa.titulo}</span>
                            </div>`
            }else{
                fotosHtml+=`<div class="candidates">
                                <img src="/images/${candidato.fotos[i].url}">
                                <span>${etapa.titulo}</span>
                            </div>`
            }
        };
        lateral.innerHTML = fotosHtml;
    }else{
        let piscaFinder = document.querySelector('.number.pisca');
        if(piscaFinder != null){
            piscaFinder.classList.remove('pisca')
        }
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = 'VOTO NULO'
        descricao.classList.add('aviso', 'pisca');
        
        votoBranco = true;
    }
}

for(let i=0;i<10;i++){
    let keyvalue = pressedKey[i].innerText
    pressedKey[i].addEventListener('click', ()=>{
        let elNumero = document.querySelector('.number.pisca');
        if(elNumero){
            elNumero.innerHTML = keyvalue;
            numero+=keyvalue

            elNumero.classList.remove('pisca');
            if(elNumero.nextElementSibling){
                elNumero.nextElementSibling.classList.add('pisca')
            }else{
                updateInterface()
            }
        }
    })
}

function final(){
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = '';
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    lateral.style.width = '0'
    numeros.innerHTML = 'FIM';
    numeros.classList.add('pisca','aviso')
    numeros.style.justifyContent = 'center';
    numeros.style.alignSelf = 'baseline';
}

function corrige(){
    iniciarEtapa();
}
function branco(){
    if(numero == ''){
        updateInterface();
    }
}
function confirma(){
    let piscaFinder = document.querySelector('.number.pisca')
    if(votoBranco == true | piscaFinder == null){
        etapaAtual+=1
        if(etapaAtual <=1){
            iniciarEtapa();
        }else{
            final()
        }
    }
}

iniciarEtapa()