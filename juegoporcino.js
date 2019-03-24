document.addEventListener("keydown", moverCerdo);

//////////Preparacion de variables///////////
var mapa = document.getElementById('granja');
var papel = mapa.getContext("2d");
var xCerdo = 420;
var yCerdo = -15;
var xLobo = new Array();
var yLobo = new Array();

var teclas = {
  UP : 38,
  DOWN : 40,
  LEFT : 37,
  RIGHT : 39
};

var fondo = {
  url: "tile.png",
  cargaEst: false
};

var cerdo = {
  url: "cerdo.png",
  cargaEst: false
};

var lobo = {
  url: "lobo.png",
  cargaEst: false
};

fondo.imagen = new Image;
fondo.imagen.src = fondo.url;
fondo.imagen.addEventListener("load", cargarFondo);

cerdo.imagen = new Image;
cerdo.imagen.src = cerdo.url;
cerdo.imagen.addEventListener("load", cargarCerdo);

lobo.imagen = new Image;
lobo.imagen.src = lobo.url;
lobo.imagen.addEventListener("load", cargarLobos);

///////////Funciones que cargan las imagenes/////////
function cargarFondo()
{
  fondo.cargaEst = true;
  dibujar();
}

function cargarCerdo()
{
  cerdo.cargaEst = true;
  dibujar();
}

var cantidad = aleatorio(3, 8);
function cargarLobos()
{
  lobo.cargaEst = true;
  for(var l = 0; l < cantidad; l++)
  {
    var x = aleatorio(0, 7);
    var y = aleatorio(0, 7);
    x = x*60;
    y = y*60;
    xLobo[l] = x;
    yLobo[l] = y;
  }
  dibujar();
}

//////////////Funcion que dibuja las imagenes/////
function dibujar()
{
  if (fondo.cargaEst)
  {
    papel.drawImage(fondo.imagen, 0,0);
  }
  if (cerdo.cargaEst)
  {
    papel.drawImage(cerdo.imagen, xCerdo, yCerdo);
  }
  if (lobo.cargaEst)
  {
    dibujarLobos();
  }
}

function dibujarLobos()
{
  for(var l=0; l<cantidad; l++){
    papel.drawImage(lobo.imagen, xLobo[l], yLobo[l]);
  }
}

//////////////Funcion que mueve al cerdo//////
function moverCerdo(pasos)
{

  var movimiento = 5;
  switch (pasos.keyCode)
  {
    case teclas.UP:
      papel.drawImage(fondo.imagen, 0,0);
      dibujarLobos();
      papel.drawImage(cerdo.imagen, xCerdo, yCerdo - movimiento);
      yCerdo = yCerdo - movimiento;
    break;
    case teclas.DOWN:
      papel.drawImage(fondo.imagen, 0,0);
      dibujarLobos();
      papel.drawImage(cerdo.imagen, xCerdo, yCerdo + movimiento);
      yCerdo = yCerdo + movimiento;
    break;
    case teclas.LEFT:
      papel.drawImage(fondo.imagen, 0,0);
      dibujarLobos();
      papel.drawImage(cerdo.imagen, xCerdo - movimiento, yCerdo);
      xCerdo = xCerdo - movimiento;
    break;
    case teclas.RIGHT:
      papel.drawImage(fondo.imagen, 0,0);
      dibujarLobos();
      papel.drawImage(cerdo.imagen, xCerdo + movimiento, yCerdo);
      xCerdo = xCerdo + movimiento;
    break;
    default:
      console.log("Presionó otra tecla");
    break;
  }

  if (xCerdo > -5 && xCerdo < 10 && yCerdo>425 && yCerdo<500)
  {
      alert("¡Felicidaes, el cerdo está a salvo!");
  }
  else
  {
    huida();
  }
}

//////Funcion que determina si se comieron al cerdo/////////
function huida()
{
  var xIzqC = xCerdo + 13, ySupC = yCerdo + 28,
      xDerC = xCerdo + 69, yInfC = yCerdo + 50;
  for(var i=0; i<cantidad; i++)
  {
    var xSupL = xLobo[i];
    var ySupL = yLobo[i] + 23;
    var xInfL = xLobo[i] + 64;
    var yInfL = yLobo[i] + 64;

    if ( ((xIzqC > xSupL) && (xIzqC < xInfL)) &&
        ((ySupC > ySupL) && (ySupC < yInfL)) )
    {
      alert("¡Te atrapó el lobo!");
      papel.drawImage(fondo.imagen, 0,0);
      dibujarLobos();
    }
    if ( ((xIzqC > xSupL) && (xIzqC < xInfL)) &&
        ((yInfC > ySupL) && (yInfC < yInfL)) )
    {
      alert("¡Te atrapó el lobo!");
      papel.drawImage(fondo.imagen, 0,0);
      dibujarLobos();
    }
    if ( ((xDerC > xSupL) && (xDerC < xInfL)) &&
        ((ySupC > ySupL) && (ySupC < yInfL)) )
    {
     alert("¡Te atrapó el lobo!");
     papel.drawImage(fondo.imagen, 0,0);
     dibujarLobos();
   }
   if ( ((xDerC > xSupL) && (xDerC < xInfL)) &&
       ((yInfC > ySupL) && (yInfC < yInfL)) )
   {
     alert("¡Te atrapó el lobo!");
     papel.drawImage(fondo.imagen, 0,0);
     dibujarLobos();
   }
 }
}

////////////Funcion que crea numeros aleatorios/////////////
function aleatorio(min, maxi)
{
 var resultado;
 resultado = Math.floor(Math.random() * (maxi - min + 1)) + min;
 return resultado;
}
