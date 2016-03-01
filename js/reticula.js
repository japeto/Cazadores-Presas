//       #    #    #     # ####### #######    #    #     # 
//       #   # #   ##   ##    #    #         # #   ##   ## 
//       #  #   #  # # # #    #    #        #   #  # # # # 
//       # #     # #  #  #    #    #####   #     # #  #  # 
// #     # ####### #     #    #    #       ####### #     # 
// #     # #     # #     #    #    #       #     # #     # 
//  #####  #     # #     #    #    ####### #     # #     # 


function reticula(lienzo)
{
    //variables iniciales
    poblacionInicialConejos =  parseInt($("#numPrey").val());
    poblacionInicialZorros = parseInt($("#numPredators").val());
    tasaCrecimientoConejos = parseFloat($("#ratepreygrowth").val());
    tasaCrecimientoZorros = parseFloat($("#ratepredatorgrowth").val());
    tasaMortalidadZorros = parseFloat($("#ratepredatordeath").val());
    // imgConejo = new Image();
    // imgZorro = new Image();
    // imgConejo.src = 'images/conejo.png';
    // imgZorro.src = 'images/zorro.png';

    //se inicializa el campo de juego
    campo = new Array(75);     
    for(var i = 0; i < 75; i++ ){
        campo[i] = new Array(40);
        // campo[i].fill("v");  // lo lleno con vacios
    }

    console.log(poblacionInicialZorros)
    poblarReticulo(lienzo);
}


function poblarReticulo(lienzo){

    var cantidadZorros = poblacionInicialZorros;
    var cantidadConejos = poblacionInicialConejos;
    var desicion; //se coloca vacio o se coloca un conejo o un zorro
    areaDibujo.clearRect(0, 0, lienzo.width, lienzo.height);

    for(var i = 0; i < campo.length; i++)
    {
        for(var j = 0; j < campo[i].length; j++)
        {
            if( cantidadZorros != 0) {

                var ejex = Math.floor(Math.random() * campo.length)
                var ejey = Math.floor(Math.random() * campo[i].length)
                campo[ejex][ejey]= 'z';
                cantidadZorros--;
                lienzo.save();
            }
            if(cantidadConejos != 0){

                var ejex = Math.floor(Math.random() * campo.length)
                var ejey = Math.floor(Math.random() * campo[i].length)
                campo[ejex][ejey]= 'c';
                cantidadConejos--;
                lienzo.save();
            }
            if(campo[i][j] == undefined)
            {
                campo[i][j] = 'v';
            }

        }    
    }
}


function moverEntreCeldas(lienzo)
{        
    actualizar(lienzo);
    for(var i = 0; i < campo.length; i++)
    {
        for(var j = 0; j < campo[i].length; j++)
        {                       
            //Se va a mover
            var nuevaFil = Math.ceil(Math.random() * 3) - 2;
            var nuevaCol = Math.ceil(Math.random() * 3) - 2;

            //OJO: El movimiento implica que el indice horizontal se encuentra en los limites
            if( ((nuevaFil<0) && (i == 0)) || ((nuevaFil>0) && (i == (campo.length-1)) ))
            { 
                nuevaFil = 0;
            }
        
            //OJO: El movimiento implica que el indice vertical se encuentra en los limites
            if( ((nuevaCol<0) && (j == 0)) || ((nuevaCol>0) && (j == (campo[i].length-1)) ))
            {
                nuevaCol = 0;
            }

            //nuevas posiciones de la celda a afectar
            var vecinoEnX = i + nuevaFil;
            var vecinoEnY = j + nuevaCol;            

            //Probabilidad de un evento. Para saber si una tasa se aplica o no
            var tasaProbable = Math.random();

            //Inicio de la simulacion
            //Comencemos a mirar si hay conejos en la celda.
            if(campo[i][j] == 'c')
            {
                
                //Si hay un zorro en la celda vecina
                if(campo[vecinoEnX][vecinoEnY] == 'z')
                {
                    campo[i][j] = 'v'; //el conejo ha saltado de celda
                    campo[vecinoEnX][vecinoEnY] = 'z'; //el zorro se ha comido al conejo                    
                }
                else
                {
                    //si es posible, mirar si los conejos se pueden reproducir
                    if(tasaProbable < tasaCrecimientoConejos)
                    {
                        campo[vecinoEnX][vecinoEnY] = 'c';
                    }
                    else 
                    {
                        //Solo salta a la celda vecina si esta desocupada.
                        campo[i][j] = 'v';
                        campo[vecinoEnX][vecinoEnX] = 'c';
                    }
                }
            }
            else
            {
                //Miremos ahora si hay un zorro
                if(campo[i][j] == 'z')
                {
                    //Hay un conejo en la celda vecina
                    if(campo[vecinoEnX][vecinoEnY] == 'c')
                    {
                        //Como pudo comer algo, de pronto puede dejar descendencia
                        if(tasaProbable < tasaCrecimientoZorros)
                        {
                            campo[vecinoEnX][vecinoEnY] = 'z';
                        }
                        else
                        { //no pudo dejar descendencia y solo se mueve
                            campo[i][j] = 'v';
                            campo[vecinoEnX][vecinoEnY] = 'z';
                        }
                    }
                    else
                    {
                    //No hay conejos, se puede morir si no enceuntra alimento
                        if(tasaProbable < tasaMortalidadZorros)
                        {
                            campo[i][j] = 'v';
                        }
                        else
                        {//sobrevive por el momento, y camina a la siguiente celda 
                            campo[vecinoEnX][vecinoEnY] = 'z';
                            campo[i][j] = 'v';
                        }
                    }                    
                }
                else
                {//no hay conejos o zorros. Que siga la busqueda por la celda
                    continue;
                }
            }
        }
    }
    //~ pausarAnimacion = setTimeout(moverEntreCeldas, 1000, lienzo);
}

function actualizar(lienzo)
{    
    lienzo.canvas.width = $("#arealienzo").width(); //para borrar el canvas y dar el efecto de animacion    
    for(var i = 0; i < campo.length; i++)
    {
        for(var j = 0; j < campo[i].length; j++)
        {
            var contenido = campo[i][j];
            if(contenido == 'c'){
                lienzo.fillStyle = "#ff0000";
                lienzo.fillText("P",10*i, 10*j);
                // lienzo.drawImage(imgConejo, 10*i, 10*j, 10, 10);
            }
           if(contenido == 'z'){
                lienzo.fillStyle = "#336699";
                lienzo.fillText("C",10*i, 10*j);
                // lienzo.drawImage(imgZorro, 10*i, 10*j, 10, 10);
            }
        }
    }
    lienzo.save();
}

//variables iniciales
var poblacionInicialConejos; 
var poblacionInicialZorros; 
var tasaCrecimientoConejos; 
var tasaCrecimientoZorros; 
var tasaMortalidadZorros; 
var campo;
// var imgConejo;
// var imgZorro;
var pausarAnimacion;