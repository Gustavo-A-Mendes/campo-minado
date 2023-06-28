var linhas, colunas, bombas, matriz, tabela;

// tabela.ondblclick = limparAoRedor;
// console.log(tabela);
// mostrarMatriz();
// console.log(matriz);
var primeiro;  

// function teste(e) {
//   if (e.which == 2) {
//     console.log('oi');
//   }
//   console.log(e);
// };

// var menu = document.getElementById('menu');
// menu.onmouseup = teste;

function iniciarButton() {
  let menu = document.getElementById('menu');
  menu.style.display = 'none';

  registrarEvent();
}

function recomecar() {
  let menu = document.getElementById('menu');
  menu.style.display = 'block';
}

function mudarTamanho() {
  let td = document.querySelectorAll("td");
  // console.log(td);
  diff = document.getElementById('dificuldade');
  for (let i = 0; i < td.length; i++) {
    switch (parseInt(diff.value)) {
      case 0:
        td[i].style.height = "60px";
        td[i].style.width = "60px";
        td[i].childNodes[0].childNodes[1].style.fontSize = "26px";
        break;
      case 1:
        td[i].style.height = "35px";
        td[i].style.width = "35px";
        td[i].childNodes[0].childNodes[1].style.fontSize = "15px";
        break;
      case 2:
        td[i].style.height = "35px";
        td[i].style.width = "35px";
        td[i].childNodes[0].childNodes[1].style.fontSize = "15px";
        break;
      default:
        break;
    }
  }
}

function init() {
  primeiro = 0;

  // console.log(primeiro);
  tabela = document.getElementById("tabela");
  tabela.onmouseup = verificar;
  tabela.oncontextmenu = bandeira;
  let diff = document.getElementById('dificuldade');
  // console.log(diff);
  switch (parseInt(diff.value)) {
    case 0:
      linhas = 9;
      colunas = 9;
      bombas = 10;
      break;
    case 1:
      linhas = 16;
      colunas = 16;
      bombas = 40;
      break;
    default:
      linhas = 16;
      colunas = 30;
      bombas = 99;
      break;
  }
  gerarTabela(linhas, colunas);
  mudarTamanho();
  bandeiraPosta();

  // gerarBombas(l, c);
  // gerarNumeros();
}


function primeiroClick(event) {
  if (!primeiro) {
    let celula = event.target;
    let td = celula.parentNode.parentNode;
    let linha = td.parentNode.rowIndex;
    let coluna = td.cellIndex;
    // console.log(celula.className);
    if (celula.className !== 'flag' && !(celula.className.includes('number'))) {
      // celula.className = 'invisible';
      celula.nextSibling.innerHTML = ''
      celula.nextSibling.className = 'blank';
      // gerarBombas(linha, coluna);
      // gerarNumeros();
      mostrarMatriz(linha, coluna);
      primeiro = 1;
    }
  }
}


function gerarMatriz(l, c) {
  matriz = [];
  for (let i = 0; i < l; i++) {
    // matriz[i] = [];
    // for (var j = 0; j < c; j++) {
    //   matriz[i][j] = 0;
    // }
    matriz[i]= new Array(c).fill(0);
  }
  // return matriz;
}

function gerarTabela(l, c) {
  gerarMatriz(l, c);
  // console.log(gerarMatriz(l,c));
  
  // tabela = document.getElementById('tabela');
  let str = "";
  for (let i = 0; i < l; i++) {
    str += "<tr>";
    for (let j = 0; j < c; j++) {
      str += "<td><div class='position'><div class='block'></div><div class='number'></div></div></td>";
    }
    str += "</tr>";
  }
  tabela.innerHTML = str;
  
  // tabela = document.getElementById('tabela');
  // for (var  linha of matriz) {
  //   var tr = document.createElement('tr');
  //   tabela.appendChild(tr);
  //   for (var coluna of linha) {
  //     var td = document.createElement('td');
  //     var posicao = document.createElement('div');
  //     posicao.className = "position";
  //     var bloqueio = document.createElement('div');
  //     bloqueio.className = "block";
  //     var numero = document.createElement('div');
  //     numero.className = "number"
  //     posicao.appendChild(bloqueio);
  //     posicao.appendChild(numero);
  //     td.appendChild(posicao);
  //     // debugger;
  //     tr.appendChild(td);
  //   }
  // }
}

function gerarBombas(l, c) {
  let lugaresProibidos = [];
  // bombas = 40;
  for (let i = l-1; i <= l+1; i++) {
    for (let j = c-1; j <= c+1; j++) {
      if ((i >= 0 && i < linhas) && (j >= 0 && j < colunas)) {
        lugaresProibidos.push([i, j]);
      } 
    }
  }
  for (let i = 0; i < bombas;) {
    let linha = parseInt(Math.random() * linhas);
    let coluna = parseInt(Math.random() * colunas);

    // console.log([linha, coluna]);
    var teste = true;
    if (JSON.stringify(lugaresProibidos).includes("[" + linha + "," + coluna + "]")) {
      teste = false;
    } else {
      teste = true;
    }

    if (teste) {
      if (matriz[linha][coluna] === 0) {
        matriz[linha][coluna] = -1;
        i++;
      }
    }
  }
}

function contarBombas(l, c) {
  let count = 0;
  for (let i = l-1; i <= l+1; i++) {
    for (let j = c-1; j <= c+1; j++) {
      if ((i >= 0 && i < linhas) && (j >= 0 && j < colunas)) {
        if (matriz[i][j] === -1) {
          count++;
        }
      }
    }
  }
  matriz[l][c] = count;
}

function gerarNumeros() {
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      if (matriz[i][j] !== -1) {
        contarBombas(i, j);
      }
    }
  }
}

function mostrarMatriz(l, c) {
  // linhas = 16;
  // colunas = 16;
  
  gerarBombas(l, c);
  gerarNumeros();
  
  // console.log(matriz);
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      let number = tabela.rows[i].cells[j].childNodes[0].childNodes[1];
      if (matriz[i][j] === -1) {
        number.innerHTML = '&#128163;';
      } else {
                            // div.position \ div.number
        number.innerHTML = matriz[i][j];
      }
    }
  }
}

function mostrarBombas() {
  // console.log(tabela.rows[i].cells[j]);
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      let td = tabela.rows[i].cells[j].childNodes[0].childNodes[0];
      if ((matriz[i][j] === -1)) {
        td.nextSibling.innerHTML = '&#128163;';  
        td.className = 'invisible';
      }
    }
  }  
};

function bandeira(event) {
  let celula = event.target;

  if (celula.className === 'block') {
    celula.className = 'flag';
    celula.innerHTML = "&#128681;"//&#9873;
  } else if (celula.className === "flag") {
    celula.className = 'block';
    celula.innerHTML = "";
  }
  bandeiraPosta();


  return false;
}

function verificar(event) {
  // console.log(event);
  primeiroClick(event);
  if (primeiro) {
    if ((event.which == 1) || (event.which == 2)) {
      // console.log(event.target.nextSibling);
      let celula = event.target;
      if (celula.className !== 'flag' && !(celula.className.includes('number'))) {
        let td = celula.parentNode.parentNode;
        let linha = td.parentNode.rowIndex;
        let coluna = td.cellIndex;
        switch (matriz[linha][coluna]) {
          case -1:
            mostrarBombas();
            // varrer(linha, coluna);       
            celula.nextSibling.style.backgroundColor = "red";
            tabela.onmouseup = undefined;
            tabela.oncontextmenu = undefined;
            celula.className = 'invisible';
            console.log("Você perdeu!");
            break;
          case 0:
            limparCelulas(linha, coluna);
            break;
          default:
            celula.className = 'invisible';
            celula.nextSibling.className = 'number n' + matriz[linha][coluna];
            celula.nextSibling.innerHTML = matriz[linha][coluna];
            break;
        }
        fimDeJogo();
      } else if (celula.className.includes('number')) {
        limparAoRedor(event);
      }
      return false;

    }
  }
}

function limparAoRedor(event) {
  let celula = event.target;
  let td = celula.parentNode.parentNode;
  let linha = td.parentNode.rowIndex;
  let coluna = td.cellIndex;
  let countFlag = 0;
  let countBomba = 0;
  // console.log(celula.className);
  if (celula.className.includes('number')) {
    for (let i = linha-1; i <= linha+1; i++) {
      for (let j = coluna-1; j <= coluna+1; j++) {
        if ((i >= 0 && i < linhas) && (j >= 0 && j < colunas)) {
          var celTeste1 = tabela.rows[i].cells[j].childNodes[0].childNodes[0];
          if (matriz[i][j] === -1) {
            countBomba++;
          }
          if (celTeste1.className === 'flag') {
            countFlag++;
          }
        }
      }
    }
  }
  // console.log("oi");
  for (var i = linha-1; i <= linha+1; i++) {
    for (var j = coluna-1; j <= coluna+1; j++) {
      if ((i >= 0 && i < linhas) && (j >= 0 && j < colunas)) {
        var celTeste2 = tabela.rows[i].cells[j].childNodes[0].childNodes[0];
        // console.log(celTeste2);
        if ((celTeste2.className !== 'flag') && (countFlag === countBomba)) {
          switch (matriz[i][j]) {
            case -1:
              mostrarBombas();
              celTeste2.nextSibling.style.backgroundColor = "red";
              tabela.onmouseup = undefined;
              tabela.oncontextmenu = undefined;
              console.log("Você perdeu!");
              return;
            case 0:
              limparCelulas(i, j);
              break;
            default:
              celTeste2.className = 'invisible';
              celTeste2.nextSibling.className = 'number n' + matriz[i][j];
          }
        }
      }
    }
  }
  fimDeJogo();
}

function limparCelulas(l, c) {
  for (let i = l-1; i <= l+1; i++) {
    for (let j = c-1; j <= c+1; j++) {
      if ((i >= 0 && i < linhas) && (j >= 0 && j < colunas)) {
        let celula = tabela.rows[i].cells[j].childNodes[0].childNodes[0];
        // console.log(celula);
        if (celula.className !== 'invisible' && celula.className !== 'flag') {
          switch (matriz[i][j]) {
            case -1:
              break;
            case 0:
              celula.nextSibling.innerHTML = "";
              celula.className = 'invisible';
              celula.nextSibling.className = 'blank';
              limparCelulas(i, j);
              break;
            default:
              celula.className = 'invisible';
              celula.nextSibling.innerHTML = matriz[i][j];
              celula.nextSibling.className = 'number n' + matriz[i][j];
          }
        }
      }
    }
  }
}

function varrer(l, c) {
  // a ideia é que ele parta da bomba clicada e expanda o raio de varredura, testando um novo "circulo" mais externo, até que todos sejam testados, precisando de um delay entre cada circulo, para dar aparência de uma varredura em forma de onda
  var raio = 1
  while (true) {    
    for (let i = l-raio; i <= l+raio; i++) {
      for (let j = c-raio; j <= c+raio; j++) {
        if ((i >= 0 && i < linhas) && (j >= 0 && j < colunas)) {
          mostrarBombass(i, j);
        }
        var cont = tabela.querySelectorAll('.tested').length;
        if (cont >= (linhas * colunas)) {
          return;
        } 
      }
    }
      
    raio++;
  }
  // varrer(i, j);
}

function mostrarBombass(l, c) {
  let td = tabela.rows[l].cells[c].childNodes[0].childNodes[0];
  if (!(tabela.rows[l].cells[c].className.includes('tested'))) {
    tabela.rows[l].cells[c].classList.add('tested');
    if ((matriz[l][c] === -1)) {
      td.classList.add('invisible');
    } else {
      sleep(20);
    } 
  }
};

function fimDeJogo() {
  let celulas = document.querySelectorAll(".block, .flag");
  // console.log(celulas);
  if (celulas.length === bombas) {
    mostrarBombas();
    celulas.forEach(element => {
      element.nextElementSibling.style.backgroundColor = 'green';
    });
    tabela.onmouseup = undefined;
    tabela.oncontextmenu = undefined;
    console.log("Você venceu!");
  }
}


function bandeiraPosta() {
  let celulas = document.querySelectorAll(".flag");
  // console.log(celulas);
  let contador = document.getElementById('counter');
  contador.textContent = bombas - celulas.length
}


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function registrarEvent() {
  init();
  let diff = document.getElementById('dificuldade');
  diff.onchange = init;
}
onload = registrarEvent;



// var minas = 40;
// function campo(rows_count, cols_count, mines) {
  //   // Array dos valores do campo minado
  //   var rows = [];
  //   var mines = gerarBomba(minas, rows_count, cols_count)
//   // Posiciona as bombas
//   for (var i = 0; i < rows_count; i++) {
//     // i define o eixo y (quantidade de linhas)
//     rows[i] = [];
//     for (var j = 0; j < cols_count; j++) {
//       // j define o eixo x (quantidade de elementos por linha, isto é, as colunas)
//       if (mines.map(x => JSON.stringify(x)).includes("[" + j + "," + i + "]")) {
//         rows[i][j] = -1;
//       } else {
//         rows[i][j] = 0;
//       }
//     }
//   }

//   /*
//   POSIÇÕES DAS BOMBAS NA ARRAY:
  
//   [i-1, j-1] [i-1, j] [i-1, j+1]
//   [i  , j-1] [  ?   ] [i  , j+1]
//   [i+1, j-1] [i+1, j] [i+1, j+1]
//   */
  
//   // Incrementa o número indicador da posição testada para cada bomba próxima
//   for (let i = 0; i < rows_count; i++) {
//     for (let j = 0; j < cols_count; j++) {
//       if (rows[i][j] !== "*") {
//         // if (rows[i - 1] !== undefined && rows[i - 1][j - 1] === "*") rows[i][j]++;
//         // if (rows[i - 1] !== undefined && rows[i - 1][j    ] === "*") rows[i][j]++;
//         // if (rows[i - 1] !== undefined && rows[i - 1][j + 1] === "*") rows[i][j]++;

//         // if (rows[i][j - 1] === "*") rows[i][j]++;
//         // if (rows[i][j + 1] === "*") rows[i][j]++;

//         // if (rows[i + 1] !== undefined && rows[i + 1][j - 1] === "*") rows[i][j]++;
//         // if (rows[i + 1] !== undefined && rows[i + 1][j] === "*") rows[i][j]++;
//         // if (rows[i + 1] !== undefined && rows[i + 1][j + 1] === "*") rows[i][j]++;
//         gerarNumero(i, j, rows_count, cols_count, rows);
//       }
//     }
//   }
//   // console.log(rows);
  
//   return rows;
// }

// function clicou(event) {
//   if (event.target.textContent === "*") {
//     for (element of document.querySelectorAll('span')) {
//       element.classList.remove('invisible');
//     }
//     alert('perdeu playboy!');
//     window.location.reload();
//   } else {
//     event.target.childNodes[0].classList.add('invisible');
//     event.target.childNodes[1].classList.remove('invisible');
//   }
//   // alert('clicou');
// }

// function drawTable(rows) {
//   var table = document.getElementById('tabela');
//   for (var  row of rows) {
//     var tr = document.createElement('tr');
//     table.appendChild(tr);
//     for (var col of row) {
//       var td = document.createElement('td');
//       var tampa = document.createElement('span');
//       var numero = document.createElement('span');
//       // debugger;
//       numero.textContent = col;
//       tampa.classList.add('tampa');
//       // numero.classList.add('invisible');
//       numero.classList.add('numero');
//       numero.classList.add('n'+col);
//       // td.appendChild(tampa);
//       td.appendChild(numero);
//       tr.appendChild(td);
//       td.addEventListener('click', clicou);
//     }
//   }
// }

// function gerarBombas(n, rows_count, cols_count) {
//   var mines = [];
//   for (var i = 0; i < n; i++) {
//     var x = parseInt(Math.random() * cols_count);
//     var y = parseInt(Math.random() * rows_count);
//     if (!(mines.map(x => JSON.stringify(x)).includes("[" + x + "," + y + "]"))) {
//       mines.push([x,y]);
//     } else {
//       i--;
//     }
//   }
  
//   return mines;
// }

// function gerarNumero(r, c, rows_count, cols_count, matriz) {
//   var count = 0;

//   for (var i = r - 1; i <= r + 1; i++) {
//       for (var j = c - 1; j <= c + 1; j++) {
//           if ((i >= 0 && i < rows_count) && (j >= 0 && j < cols_count)) {
//               if (matriz[i][j] === "*") {
//                   count++;
//               }
//           }
//       }
//   }
//   matriz[r][c] = count;
// }

// // var mines = [[0, 7], [3, 3], [5, 2], [7, 7], [4, 2], [1, 2]];
// // console.log(mines);
// drawTable(campo(10,8));  