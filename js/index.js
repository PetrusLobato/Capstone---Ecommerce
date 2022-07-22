let ulCard = document.querySelector('.cards');
let ulCarrinho = document.querySelector('.itensCarro');


let divTotal = document.querySelector('.total');

let divQuantidade = document.createElement('div');
divQuantidade.classList.add('result');

let pQuantidade = document.createElement('p');
pQuantidade.innerText = 'Quantidade:';

let pUnidade = document.createElement('p');
pUnidade.innerText = '0';

let divPrecoTotal = document.createElement('div');
divPrecoTotal.classList.add('result');

let pPrecoTotal = document.createElement('p');
pPrecoTotal.innerText = "Total";

let pValorTotal = document.createElement('p');
pValorTotal.innerText = `R$ ${0}`

divTotal.append(divQuantidade, divPrecoTotal);
divQuantidade.append(pQuantidade, pUnidade);
divPrecoTotal.append(pPrecoTotal, pValorTotal);


function listaDeProdutos(arrayProdutos){

    ulCard.innerHTML = ""

    arrayProdutos.forEach((element, i) => {

        let produto    = element;
        
        let cardPronto = criarCard(produto);

        ulCard.appendChild(cardPronto)
        
    });

}

listaDeProdutos(data)


function criarCard(produto){

    let imagem      = produto.img;
    let nome        = produto.nameItem;
    let descricao   = produto.description;
    let valor       = produto.value;
    let add         = produto.addCart;
    let tag         = produto.tag;
    let id          = produto.id

    
   
    let li = document.createElement('li');
    li.classList.add('carItens');

    let figure = document.createElement('figure');
    let img    = document.createElement('img');
    img.src    = imagem;
    img.alt    = nome;
    
    let div = document.createElement('div');
    div.setAttribute('class', 'especificacao');

    let p1       = document.createElement('p');
    p1.classList.add('categoria');
    p1.innerText = tag;

    let h2       = document.createElement('h2');
    h2.innerText = nome;

    let p2       = document.createElement('p');
    p2.classList.add('descricao');
    p2.innerText = descricao;

    let p3       = document.createElement('p');
    p3.setAttribute('class', 'precoItem');
    p3.innerText = `R$ ${valor},00`;

    let button       = document.createElement('button');
    button.classList.add('adicionar');
    button.setAttribute('id', id)
    button.innerText = add;
    
    figure.appendChild(img);
    li.append(figure, div);
    div.append(p1, h2, p2, p3, button);
    
    return li;
}


let carrinho = [];
let soma = 0



ulCard.addEventListener('click', (event) => {
    


    let btnAddCarrinho = event.target;

    if(btnAddCarrinho.tagName == 'BUTTON'){
        
        let idProduto = btnAddCarrinho.id

        let produto = data.find(function(produto){
            if(produto.id == idProduto){
                return produto
            }
        })
        
        if(produto !== undefined){
           

        let lCarro = document.createElement('li');
        lCarro.classList.add('liCarro');

        let imgCarro = document.createElement('img');
        imgCarro.classList.add('imgCarro');
        imgCarro.src = produto.img;
        imgCarro.alt = produto.nameItem;
            
        let divCarro = document.createElement('div');
        divCarro.classList.add('divCarro');

        let h2Carro = document.createElement('h2');
        h2Carro.classList.add('hCarro');
        h2Carro.innerText = produto.nameItem;

        let pCarro = document.createElement('p');
        pCarro.classList.add('pCarro');
        pCarro.innerText = `R$ ${produto.value},00`;

        let btnRemove = document.createElement('button');
        btnRemove.classList.add('bttCarro');
        btnRemove.setAttribute('id', idProduto);
        btnRemove.innerText = 'Remover produto';

        lCarro.append(imgCarro, divCarro);
        divCarro.append(h2Carro, pCarro, btnRemove);

        carrinho.unshift(lCarro)

        adicionarCarrinho(carrinho)
        
    }

   }

})

    

 // adicionar item no carrrinho
function adicionarCarrinho(elementCarro){
    ulCarrinho.innerHTML = ""

    if(elementCarro.length > 0 ){
    

    elementCarro.forEach((element, i) => {
    
        let produto    = element;

      
        ulCarrinho.appendChild(produto)
        
    })}else{
        ulCarrinho.innerHTML =`<div class="itensVazio">
        <p class="vazio">Carrinho Vazio</p>
        <p class="addItens">Adicione itens</p>
        </div>`
    };

    somaCarrinho(carrinho)
}
adicionarCarrinho(carrinho)


function removendoProduto(event){

    let btnRemocao = event.target;

    if(btnRemocao.tagName == 'BUTTON'){
        let btnid = btnRemocao.id
        
        

        for(let i = 0; i < carrinho.length; i++){
          
            if(carrinho[i].children[1].children[2].id == btnid){
                
                let valor = carrinho[i].children[1].children[1].innerText.replace('R$ ', '').replace(',00','');
                soma -= valor;
                carrinho.splice(i, 1);
                adicionarCarrinho(carrinho)

                pValorTotal.innerText = `R$ ${soma}`;

    
               pUnidade.innerText = carrinho.length;
                
                break;
                
            }
        }
        
    }
    }

ulCarrinho.addEventListener('click', removendoProduto)


function somaCarrinho(arrayCarrinho){
    soma = 0
    for(let i = 0; i < arrayCarrinho.length; i++ ){
        
        let valor = arrayCarrinho[i].children[1].children[1].innerText.replace('R$ ', '').replace(',00','');
        
        if(valor > 0){
            soma += parseInt(valor);
        }
    }
   
    pValorTotal.innerText = `R$ ${soma}`;

    
    pUnidade.innerText = arrayCarrinho.length;

    }

somaCarrinho(carrinho)


    let input    = document.querySelector('input');
    let pesquisa = document.querySelector('.btt');
    
    pesquisa.addEventListener('click', (pesquisar) => {

        let resultadoBusca = [];
        let resultadoPesquisa = input.value.toLowerCase();
       
        if(resultadoPesquisa !== "" ){

        for(let i = 0; i < data.length; i++){

            if(resultadoPesquisa == data[i].nameItem.toLowerCase() || resultadoPesquisa == data[i].tag.toLowerCase()){

                resultadoBusca.push(data[i]);
            }

           
        }
       
        listaDeProdutos(resultadoBusca);
    }
    })

    let geralHeader   = document.querySelector('.geral');
    let cadeiraHeader = document.querySelector('.cadeira');
    let monitorHeader = document.querySelector('.monitor');
    let mouseHeader   = document.querySelector('.mouse');

    geralHeader.addEventListener('click', (geralTudo)=>{
        return listaDeProdutos(data)
    })

    mouseHeader.addEventListener('click', (categoria) =>{
        let resulMouse = []

        for(let i = 0; i< data.length; i++){

            if(data[i].tag == "Mouses"){
                resulMouse.push(data[i])
            }
        }
       
        listaDeProdutos(resulMouse)
    })

    cadeiraHeader.addEventListener('click', (categoria) =>{
        let resulCadeira = []

        for(let i = 0; i< data.length; i++){

            if(data[i].tag == "Cadeiras"){
                resulCadeira.push(data[i])
            }
        }
       
        listaDeProdutos(resulCadeira)
    })

    monitorHeader.addEventListener('click', (categoria) =>{
        let resulMonitor = []

        for(let i = 0; i< data.length; i++){

            if(data[i].tag == "Monitores"){
                resulMonitor.push(data[i])
            }
        }
       
        listaDeProdutos(resulMonitor)
    })

// arrumar essa msg, condição não funciona.
    let finalizarCompra = document.querySelector('.finalizarCompra');
    finalizarCompra.addEventListener('click', function(){
        if(carrinho.length > 0){
        confirm('Obrigado por comprar na MarkGames')
    }else{
            confirm('Nenhum item no carrinho')
        }
    })

    let pBranco = document.querySelectorAll('.descricao');
    let precoBranco = document.querySelectorAll('.precoItem');
    let buttonDark = document.querySelector('.modoDark');

    buttonDark.addEventListener('click', function(){

         buttonDark.classList.toggle('ativado') /*? buttonDark.classList.remove('ativado') : buttonDark.classList.add('ativado');*/

        let mainDark = document.querySelector('main');
        mainDark.classList.contains('dark') ?  mainDark.classList.remove('dark') : mainDark.classList.add('dark');
       
        let body = document.querySelector('body');
        body.classList.contains('dark') ?  body.classList.remove('dark') : body.classList.add('dark');

        let h2Branco = document.querySelectorAll('h2');
        for(let i = 0 ; i < h2Branco.length; i++){
            let textH2 =  h2Branco[i]
            
        if(textH2.classList.contains('darkh2')){
            textH2.classList.remove('darkh2');
        }else{
            textH2.classList.add('darkh2');
        }}

      
        for(let i = 0 ; i < pBranco.length; i++){
            let textp =  pBranco[i]
            textp.classList.toggle('darkp');
            textp.classList.toggle('descricao') 
        }
        

       
        for(let i = 0 ; i < precoBranco.length; i++){
            let textpreco =  precoBranco[i]
            
        if(textpreco.classList.contains('darkp')){
            textpreco.classList.add('precoItem');
            textpreco.classList.remove('darkp');
        }else{
            textpreco.classList.add('darkp');
            textpreco.classList.remove('precoItem');
        }}
              



        
        
        

    })

    let lixeira = document.querySelector('.lixeira');
    lixeira.addEventListener('click', function(){
        for (let i = carrinho.length; i > 0; i--) {
            carrinho.pop();
          }
          adicionarCarrinho(carrinho)
    })

    