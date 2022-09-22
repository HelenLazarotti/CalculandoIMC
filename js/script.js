//Criamos um ARRAY, para facilitar nossa vida:

const data = [
    {
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        info: "Magreza",
        obesity: "0"
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Normal",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre 25,0 e 29,9",
        info: "Sobrepeso",
        obesity: "I",
    },
    {
        min: 30,
        max: 39.9,
        classification: "Entre 30,0 e 39,9",
        info: "Obesidade",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classification: "Maior que 40,0",
        info: "Obesidade grave",
        obesity: "III",
    },
];

//Selecionando meus elementos:

const imcTable = document.querySelector("#imc-table");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");

//pego os botões:
const btnCalc = document.querySelector("#btn-calc");
const btnClear = document.querySelector("#btn-clear");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");
const backBtn = document.querySelector("#btn-back");
const calcContainer = document.querySelector("#calculoDiv");
const resContainer = document.querySelector("#result-container");

//FUNÇÕES
function createTable(data) {
    //passo um forEach para ele percorrer o array, cada linha/coluna:
    data.forEach((item) => {
        //precisamos criar uma div, pra por esses elementos dentro:
        const div = document.createElement("div");

        //dou uma classe pra essa div:
        div.classList.add("table-data");

        //agora começo inserir os parágrafos com informações dentro da div:
        //o classification é la do ARRAY: ou seja, digo para ele criar uma tag com base nisso
        const classification = document.createElement("p");

        //digo o que quero que vá dentro do <p>
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        //agora preciso incluir eles na Div:
        //appendChild, pq são filhos da div: <div>:pai; <p>:filho
        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        //agora coloco na tabela CADA UMA DELAS:
        imcTable.appendChild(div);
    })
};
//peço pra criar a table da função createTable:
createTable(data);



function cleanInputs() {
    //função pra quando eu clicar no botão limpar: aqui estou dizendo que quando eu clicar, deixar os campos indicados vazios.
    heightInput.value = "";
    weightInput.value = "";

    //coloquei aqui pra que toda vez que eu voltar ele limpe meu histórico, pra nao dar erro nas corzinhas
    imcNumber.classList = ""
    imcInfo.classList = ""


    //logo fora da função peço e crio o evento de click:
}
btnClear.addEventListener("click", (e) => {
    e.preventDefault();
    cleanInputs()
    //significa que quando eu clicar sob o botão.ele ative um evento(com click, e pega a função que eu criei pra limpar);

    //uso o prefentDefault() = para não enviar/recarregar a página.
})

function validDigits(text) {
    //função pra que o usuário não posso digitar palavras, apenas números com ",":
    return text.replace(/[^0-9,]/g, "");

    //estou dizendo que tem que ter digitos de 0 até nove. O "g" é global, e vou substituir tudo que NÃO é número e vírgula, por vazio.

}
[heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {

        //crio uma variável que pegue o valor atual digitado no meu campo:
        const updateValue = validDigits(e.target.value);

        //pra limpar de digitos não permitidos
        e.target.value = updateValue;
    });
});


function calcImc(weight, height) {
    //aqui faço uma variável que vai receber a conta/fórmula do IMC:
    const imc = (weight / (height * height)).toFixed(1);

    //muitas vezes os resultados saem: 23.888888, o que não é bom, logo vamos arredondar, p 2 numeros dps da vírgula, usando: (blablabla).tofixed(quantidade nº que quero que apareça ds da vírgula)

    return imc;

}

function showOurHideResult() {
    //preciso pegar o conteiner do cálculo e do resultado, pra colocar ou tirar a classe hide:
    calcContainer.classList.toggle("hide");
    //isso quer dizer: se tem a classe hide tira, se não tem coloca.
    resContainer.classList.toggle("hide");

}

//EVENTOS BASEADOS NOS INPUTS DO USUÁRIO

//crio um evento para que quando eu clicar no botão calcular ele não envie formulário(que não tem)/não recarregue a página:
btnCalc.addEventListener("click", (e) => {
    e.preventDefault();

    //preciso converter valores dos inputs que vieram como texto > para números:
    //aqui estou dizendo que toda vírgula sera substituida por um ponto, pq? Alguns países usam vírgulas, outros usam pontos, logo precisamos fazer isso pra não gerar confusão:
    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");

    //agora faço as condicinais, do cálculo:
    //SE não tiver peso OU não tiver altura, ele deve retornar:
    if (!weight || !height) return


    //aqui passo a função que que quero que execute quando eu clicar no botão calcular
    const imc = calcImc(weight, height);

    //agr preciso percorrer todos os dados do meu ARRAY pra conseguir informar ao usuário seu imc:
    let info;

    //peguei nome do meu array.pedi p procurar item.
    //se o imc>= que o mínimo la do ARRAY E imc <= que o máximo la do ARRAY, eu vou ter as informações do imc que eu quero:
    data.forEach((item) => {
        if (imc >= item.min && imc <= item.max) {
            info = item.info;
        }
    });

    //aqui eu digo, SE ele não achou nenhum valor na faixa seja pq o ús. digitou valores muito grandes e doidos eu vou retornar, pois ele ñ achou nenhum valor que batesse:
    if (!info) return;

    //agr com os valores que eu calculei preciso prencher os <span>
    imcNumber.innerText = imc;
    imcInfo.innerText = info;

    switch (info) {
        case "Magreza":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break

        case "Normal":
            imcNumber.classList.add("good");
            imcInfo.classList.add("good");
            break

        case "Sobrepeso":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break

        case "Obesidade":
            imcNumber.classList.add("medium");
            imcInfo.classList.add("medium");
            break

        case "Obesidade grave":
            imcNumber.classList.add("hight");
            imcInfo.classList.add("hight");
            break
    }

    //como a ação de exibir vai ser feita em 2 momentos, ou seja, quando eu for voltar e quando eu calculo posso coloca isso numa função ^

    //executo a função:
    showOurHideResult();
});

//quando eu clicar no btn de voltar pro inicio:
//nao preciso colocar (e) pq o botão NÃO esta dentro de um formulário.
backBtn.addEventListener("click", () => {
    cleanInputs(); //limpo os inputs
    showOurHideResult(); //e retorno a tela inicial
})
