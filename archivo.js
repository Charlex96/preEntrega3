
const valorInfinite = 500000;
const valorPlatinum = 100000;
const valorGlod     = 50000;
const valorClassic  = 10000;

let isClickBtn = false;
let sueldo;
let textOption;

let optionCredit;
let containerText;

let isPressBtn = true;

let valorText;

let valorBtnClick = 1;

let valorCredito;
let entidadInteres;
let isBoxCreate = true;

let monto;

let text = document.createElement('p');
let titleOptCredito = document.createElement('h4');
let containerOptCredito = document.createElement('div');


let errorText = document.querySelector('.error');
let detallesText = document.querySelector('.detalles');
let pagosText = document.querySelector('.pagos');
let icon = document.querySelector('#icon');
let btn_atras = document.querySelector('.btn_atras');
let btn_continuar = document.querySelector('.btn_continuar');

let title = document.querySelector('h3');
let container1Text = document.querySelector('.container1-text');

let btn1 = document.querySelector('.btn1');
let btn2 = document.querySelector('.btn2');
let labelInput = document.querySelector('#label-input');
let inputBox = document.querySelector('.input-celular-email');
let inputNombre = document.querySelector('#nombre');
let inputCi = document.querySelector('#ci');
let inputCelularEmail = document.querySelector('#celular-email');
// let inputMonto = document.querySelector('#monto');

let containerDatos = document.querySelector('.container-datos');

let articleEntidades = document.querySelector('.article-entidades');
let containerEntidades = document.querySelector('.container-entidades');
let boxEntidades = document.querySelector('.box-entidades');

let articlePlazo = document.querySelector('.article-plazos');
let containerPlazo = document.querySelector('.container-plazos');

let articleDetalle = document.querySelector('.article-detalle');

let boxPlazo12 = document.querySelector('.box-plazos12');
let boxPlazo24 = document.querySelector('.box-plazos24');
let boxPlazo36 = document.querySelector('.box-plazos36');
let boxPlazo48 = document.querySelector('.box-plazos48');
let boxPlazo60 = document.querySelector('.box-plazos60');

let boxEntidadesNombre = document.querySelector('h4');
let interes  = document.querySelector('#interes');
let plazoMax = document.querySelector('#plazo-max');
let montoMax = document.querySelector('#monto-max');
let montoMin = document.querySelector('#monto-min');

let boxMesNombre = document.querySelector('#meses');

let cuotas12  = document.querySelector('#cuotas12');
let total12 = document.querySelector('#total12');
let cuotas24  = document.querySelector('#cuotas24');
let total24 = document.querySelector('#total24');
let cuotas36  = document.querySelector('#cuotas36');
let total36 = document.querySelector('#total36');
let cuotas48  = document.querySelector('#cuotas48');
let total48 = document.querySelector('#total48');
let cuotas60  = document.querySelector('#cuotas60');
let total60 = document.querySelector('#total60');

let cuotaDetalle = document.querySelector('#cuota-detalle');
let capitalDetalle = document.querySelector('#capital-detalle');
let interesDetalle = document.querySelector('#interes-detalle');
let totalDetalle = document.querySelector('#total-detalle');

fetch('./api-bancos.json')
.then((resp)=>resp.json())
.then((data)=>{
    
    data.forEach((entidad, index)=>{
        boxEntidadesNombre.textContent = entidad.entidad;
        interes.textContent = entidad.interes;
        plazoMax.textContent = entidad.plazosMaximo;
        // .toLocaleString('es-MX') separador de milesismas
        montoMax.textContent = entidad.montoMaximo.toLocaleString('es-MX');
        montoMin.textContent = entidad.montoMinimo.toLocaleString('es-MX');

        const entidadesDiv = boxEntidades.cloneNode(true);

        // Asignamos un evento click a cada botón clonado
        entidadesDiv.addEventListener("click", ()=>{
            switch (index) {
                case 0:
                    // entidadesDiv.style.borderColor = 'rgb(55, 129, 233)';
                    // entidadesDiv.style.borderWidth = '2px';

                    tipoCreditoButton(entidad, 0);
                    break;
            
                case 1:
                    tipoCreditoButton(entidad, 0);
                    break;
            
                case 2:
                    tipoCreditoButton(entidad, 0);
                    break;
            
                case 3:
                    tipoCreditoButton(entidad, 0);
                    break;
            }
        });

        containerEntidades.appendChild(entidadesDiv);
        // Evitamos que el elementos original aparesca
        boxEntidades.remove();

        
    })
});

function tipoCreditoButton(entidad, index){

    titleOptCredito.innerText = 'Escoje el tipo de crédito que necesitas';
    articleEntidades.appendChild(titleOptCredito);

    // articlePlazo.style.display = 'inline';

    let options = [
        'Crédito Infinite', 
        'Crédito Platinum', 
        'Crédito Glod', 
        'Crédito Classic', 
    ];
    let tiposCreditos = [
        entidad.tipoCredito[index].creditoInfinite, 
        entidad.tipoCredito[index].creditoPlatinum, 
        entidad.tipoCredito[index].creditoGlod, 
        entidad.tipoCredito[index].creditoClassic, 
    ];

    // ----- Creamos el los diferentes botones para el tipo de credito--------
    containerOptCredito.innerHTML = `
        <button class='button-tipo1' style="border-width: 1px">${options[0]}: $${(tiposCreditos[0]).toLocaleString('es-MX')}</button>
        <button class='button-tipo2' style="border-width: 1px">${options[1]}: $${(tiposCreditos[1]).toLocaleString('es-MX')}</button>
        <button class='button-tipo3' style="border-width: 1px">${options[2]}: $${(tiposCreditos[2]).toLocaleString('es-MX')}</button>
        <button class='button-tipo4' style="border-width: 1px">${options[3]}: $${(tiposCreditos[3]).toLocaleString('es-MX')}</button>
    `  

    articleEntidades.appendChild(containerOptCredito);

    // ----- Damos styles a los diferentes botones de tipo de credito--------
    let buttonTipo1 = document.querySelector('.button-tipo1');
    let buttonTipo2 = document.querySelector('.button-tipo2');
    let buttonTipo3 = document.querySelector('.button-tipo3');
    let buttonTipo4 = document.querySelector('.button-tipo4');

     // Asignamos un evento click a cada botón clonado
    buttonTipo1.addEventListener("click", ()=>{
        styleButtonTipo(
            buttonTipo1, buttonTipo2, buttonTipo3, buttonTipo4, buttonTipo4,
            'rgb(55, 129, 233)', 'black', 'black', 'black', 'black',
            '2px', '1px', '1px', '1px', '1px'
        );

        oneColorBorder();

        valorCredito = tiposCreditos[0];
        entidadInteres = entidad.interes;

        detallePrestamo(valorCredito, entidadInteres);

    });

    buttonTipo2.addEventListener("click", ()=>{
        styleButtonTipo(
            buttonTipo1, buttonTipo2, buttonTipo3, buttonTipo4, buttonTipo4,
            'black', 'rgb(55, 129, 233)', 'black', 'black', 'black',
            '1px', '2px', '1px', '1px', '1px'
        );

        oneColorBorder();

        valorCredito = tiposCreditos[1];
        entidadInteres = entidad.interes;

        detallePrestamo(valorCredito, entidadInteres);

    });

    buttonTipo3.addEventListener("click", ()=>{
        styleButtonTipo(
            buttonTipo1, buttonTipo2, buttonTipo3, buttonTipo4, buttonTipo4,
            'black', 'black', 'rgb(55, 129, 233)', 'black', 'black',
            '1px', '1px', '2px', '1px', '1px',
        );

        oneColorBorder();

        valorCredito = tiposCreditos[2];
        entidadInteres = entidad.interes;

        detallePrestamo(valorCredito, entidadInteres);

    });

    buttonTipo4.addEventListener("click", ()=>{
        styleButtonTipo(
            buttonTipo1, buttonTipo2, buttonTipo3, buttonTipo4, buttonTipo4,
            'black', 'black', 'black', 'rgb(55, 129, 233)', 'rgb(55, 129, 233)',
            '1px', '1px', '1px', '2px', '2px',
        );

        oneColorBorder();

        valorCredito = tiposCreditos[3];
        entidadInteres = entidad.interes;

        detallePrestamo(valorCredito, entidadInteres);

    });


    // ----------botones de los meses diferidos--------------

    boxPlazo12.addEventListener('click',()=>{

        optionMeses(valorCredito, entidadInteres, 12, cuotaDetalle, totalDetalle, 0);

        styleButtonTipo(
            boxPlazo12, boxPlazo24, boxPlazo36, boxPlazo48, boxPlazo60,
            'rgb(55, 129, 233)', 'black', 'black', 'black', 'black',
            '2px', '1px', '1px', '1px', '1px'
        );

        articleDetalle.style.display = 'inline';

    });

    boxPlazo24.addEventListener('click',()=>{

        optionMeses(valorCredito, entidadInteres, 24, cuotaDetalle, totalDetalle, 1);

        styleButtonTipo(
            boxPlazo12, boxPlazo24, boxPlazo36, boxPlazo48, boxPlazo60,
            'black', 'rgb(55, 129, 233)', 'black', 'black', 'black',
            '1px', '2px', '1px', '1px', '1px'
        );

        articleDetalle.style.display = 'inline';

    });

    boxPlazo36.addEventListener('click',()=>{

        optionMeses(valorCredito, entidadInteres, 36, cuotaDetalle, totalDetalle, 2);

        styleButtonTipo(
            boxPlazo12, boxPlazo24, boxPlazo36, boxPlazo48, boxPlazo60,
            'black', 'black', 'rgb(55, 129, 233)', 'black', 'black',
            '1px', '1px', '2px', '1px', '1px'
        );

        articleDetalle.style.display = 'inline';

    });

    boxPlazo48.addEventListener('click',()=>{

        optionMeses(valorCredito, entidadInteres, 48, cuotaDetalle, totalDetalle, 3);

        styleButtonTipo(
            boxPlazo12, boxPlazo24, boxPlazo36, boxPlazo48, boxPlazo60,
            'black', 'black', 'black', 'rgb(55, 129, 233)',' black',
            '1px', '1px', '1px', '2px', '1px'
        );

        articleDetalle.style.display = 'inline';

    });

    boxPlazo60.addEventListener('click',()=>{

        optionMeses(valorCredito, entidadInteres, 60, cuotaDetalle, totalDetalle, 4);

        styleButtonTipo(
            boxPlazo12, boxPlazo24, boxPlazo36, boxPlazo48, boxPlazo60,
            'black', 'black', 'black',' black', 'rgb(55, 129, 233)',
            '1px', '1px', '1px', '1px', '2px'
        );

        articleDetalle.style.display = 'inline';

    });



    // inputMonto.addEventListener('input', ()=>{
    //     monto = inputMonto.value;
    //     optionMeses(monto, entidadInteres, meses, cuotaDetalle, totalDetalle, index);
    // });
}


function oneColorBorder(){
    styleButtonTipo(
        boxPlazo12, boxPlazo24, boxPlazo36, boxPlazo48, boxPlazo60,
        'black', 'black', 'black',' black', ' black',
        '1px', '1px', '1px', '1px', '1px'
    );
}

function detallePrestamo(valorCredito, entidadInteres){

    optionMeses(valorCredito, entidadInteres, 12, cuotas12, total12, 0);
    optionMeses(valorCredito, entidadInteres, 24, cuotas24, total24, 1);
    optionMeses(valorCredito, entidadInteres, 36, cuotas36, total36, 2);
    optionMeses(valorCredito, entidadInteres, 48, cuotas48, total48, 3);
    optionMeses(valorCredito, entidadInteres, 60, cuotas60, total60, 4);

    cuotaDetalle.textContent = '';
    capitalDetalle.textContent = '';
    interesDetalle.textContent = '';
    totalDetalle.textContent = '';

    articlePlazo.style.display = 'inline';

}


function styleButtonTipo(buttonTipo1, buttonTipo2, buttonTipo3, buttonTipo4, buttonTipo5, color1, color2, color3, color4, color5 , width1,  width2 , width3 , width4, width5){
    buttonTipo1.style.borderColor = color1;
    buttonTipo2.style.borderColor = color2;
    buttonTipo3.style.borderColor = color3;
    buttonTipo4.style.borderColor = color4;
    buttonTipo5.style.borderColor = color5;

    buttonTipo1.style.borderWidth = width1;
    buttonTipo2.style.borderWidth = width2;
    buttonTipo3.style.borderWidth = width3;
    buttonTipo4.style.borderWidth = width4;
    buttonTipo5.style.borderWidth = width5;
}




function optionMeses(valorCredito, entidadInteres, mes, cuotas, total, index){


    let valorMensual = Number((valorCredito / mes).toFixed(2));
    let interes = (valorMensual) * ((entidadInteres + (index + 2)) / 100);
    let cuota1 = Number((interes + valorMensual).toFixed(2));


    cuotas.textContent = cuota1.toLocaleString('es-MX');
    total.textContent = (cuota1 * mes).toLocaleString('es-MX');

    capitalDetalle.textContent = valorCredito.toLocaleString('es-MX');
    interesDetalle.textContent = ((cuota1 * mes) - valorCredito).toLocaleString('es-MX');


    // meses.forEach((mes, index)=>{

    //     let valorMensual = Number((valorCredito / mes).toFixed(2));
    //     let interes = (valorMensual) * ((entidadInteres + (index + 2)) / 100);
    //     let cuota1 = Number((interes + valorMensual).toFixed(2));

    //      boxMesNombre.textContent = mes;

    //     cuotas.textContent = valorMensual.toLocaleString('es-MX');
    //     total.textContent = (cuota1 * mes).toLocaleString('es-MX');

        // const mesesDiv = boxPlazo.cloneNode(true);
        // containerPlazo.appendChild(mesesDiv);
        // // Evitamos que el elementos original aparesca
        // boxPlazo.remove();

    // });
}


btn1.addEventListener('click', ()=>{
    controlBtn(true);
    isPressBtn = true;

});

btn2.addEventListener('click', ()=>{
    controlBtn(false);
    isPressBtn = false;
});




inputCelularEmail.addEventListener('input', ()=>{
    inputCelularEmail.value = inputCelularEmail.value.replace(/[^0-9]/g, '');
    
});


inputNombre.addEventListener('input', habilitarBoton);
inputCi.addEventListener('input', habilitarBoton);
inputCelularEmail.addEventListener('input', habilitarBoton);


function habilitarBoton(){
    if (inputNombre.value.length > 0 && inputCi.value.length > 0 && inputCelularEmail.value.length > 0) {
        btn_continuar.disabled = false;
    } else {
        btn_continuar.disabled = true;
    }
}



function controlBtn(isPressBtn){
    btn1.style.backgroundColor = isPressBtn ? 'rgb(226, 235, 243)': 'white' ;
    btn2.style.backgroundColor = isPressBtn ? 'white' : 'rgb(226, 235, 243)';
    inputCelularEmail.placeholder = isPressBtn ? 'Ej: 0912345678' : 'Ej: nombre@gmail.com';
    inputCelularEmail.type = isPressBtn ? 'tel' : 'email';

    inputCelularEmail.value = '';

    localStorage.removeItem('celular-correo');
    btn_continuar.disabled = true;
}

btn_atras.addEventListener('click', () =>{

    let nombre = localStorage.getItem('nombre');
    let cedula = localStorage.getItem('cedula');
    let celularCorreo = localStorage.getItem('celular-correo');

    inputCi.value = cedula;
    inputCelularEmail.value = celularCorreo;

    title.textContent = 'Datos del solicitante:';

    pressContinuar1( nombre, 'Nombre', 'Tu nombre', 'none', 'inline');
    valorBtnClick = 1;

    container1Text.removeChild(text);

    articleEntidades.style.display = 'none';
    articlePlazo.style.display = 'none';
    articleDetalle.style.display = 'none';




    // switch (valorBtnClick) {
    //     case 1:
    //         let nombre = localStorage.getItem('nombre');
    //         let cedula = localStorage.getItem('cedula');
    //         let celularCorreo = localStorage.getItem('celular-correo');

    //         inputCi.value = cedula;
    //         inputCelularEmail.value = celularCorreo;

    //         title.textContent = 'Datos del solicitante:';

    //         pressContinuar1( nombre, 'Nombre', 'Tu nombre', 'none', 'inline');
    //         valorBtnClick = 1;

    //         container1Text.removeChild(text);
            
    //         break;
    //     case 2:


    //         valorBtnClick = 2;

            
    //         break;
    // }

    

});


btn_continuar.addEventListener('click', () =>{

    switch(valorBtnClick){
        case 1:
            localStorageSetInput();

            title.textContent = `Hola ${inputNombre.value}, Cuál es tu sueldo mensual:`;

            pressContinuar1( '', 'Sueldo', 'Tu sueldo', 'inline', 'none');
            valorBtnClick = 2;

            text.innerHTML = 'Sueldo minimo para la solicitud de un crédito tiene que ser mayor a $500';
            container1Text.appendChild(text);

            break;
        case 2:

            articleEntidades.style.display = 'inline';

            break;
    }


});


function localStorageSetInput(){
    localStorage.setItem('nombre' , inputNombre.value);
    localStorage.setItem('cedula' , inputCi.value);
    localStorage.setItem('celular-correo' , inputCelularEmail.value);
}


function pressContinuar1( inputValueNombre, placeholder, textLabel,  btnAtrasDisplay, displayDatos){
    inputNombre.value = inputValueNombre;
    inputNombre.placeholder = placeholder;
    
    labelInput.textContent = textLabel;
    
    btn_atras.style.display = btnAtrasDisplay;

    containerDatos.style.display = displayDatos;
}



