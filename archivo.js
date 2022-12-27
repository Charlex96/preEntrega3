

const valorInfinite = 500000;
const valorPlatinum = 100000;
const valorGlod     = 50000;
const valorClassic  = 10000;

let isClickBtn = false;
let sueldo;
let textOption;

let optionCredit;
let containerText;

let errorText = document.querySelector('.error');
let detallesText = document.querySelector('.detalles');
let pagosText = document.querySelector('.pagos');

let valorText;

let valorBtnClick = 1;

let input = document.querySelector('#nombre');


let title = document.querySelector('h3');
let container1Text = document.querySelector('.container1-text');


let btn_nombre = document.querySelector('.btn-nombre');
btn_nombre.addEventListener('click', () =>{


    switch(valorBtnClick){
        case 1:

            title.textContent = `Hola ${input.value}, Cuál es tu sueldo mensual:`;

            input.value = '';
            input.placeholder = 'Sueldo';
    
            let text = document.createElement('p');
            text.innerHTML = 'Sueldo minimo para la solicitud de un crédito tiene que ser mayor a $500';
            container1Text.appendChild(text);

            valorBtnClick = 2;

            break;
        case 2:

            // console.log('doble click');
            sueldo = input.value;
            condicionCredito(sueldo, input);
            // btn_nombre.style.display = 'none';

            valorBtnClick = 3;

            break;
        case 3:

            switch (input.value) {
                case '1':
                    opcion(valorInfinite);

                    break;
                case '2':
                    opcion(valorPlatinum);

                    break;
                case '3':
                    opcion(valorGlod);

                    break;
                case '4':
                    opcion(valorClassic);

                    break;
            
                default :
                    input.value = '';
                    errorText.textContent = 'Opción no aceptada, intente de nuevo';

                    valorBtnClick = 3;

                    break;
            }




            break;
        case 4:

            btn_nombre.style.display = 'none';

            containerText.textContent =`Meses a diferir ${'$' + valorText} de 12 meses en adelante: `;
            input.placeholder = 'Meses a diferir.';

            valorPorMeses(valorText);


            break;
    }


});


function opcion(valor){
    input.value = '';
    valorText = valor;
    containerText.textContent =`Meses a diferir ${'$' + valor} de 12 meses en adelante: `;
    input.placeholder = 'Meses a diferir.';
    valorBtnClick = 4;
    errorText.style.display = 'none';
}




const creditos = [
    {id: 1, tipoCredito: 'Crédito Infinite', valor: valorInfinite},
    {id: 2, tipoCredito: 'Crédito Platinum', valor: valorPlatinum},
    {id: 3, tipoCredito: 'Crédito Glod', valor: valorGlod},
    {id: 4, tipoCredito: 'Crédito Classic', valor: valorClassic},
]


function condicionCredito(sueldo, input){


    let resultado = creditos.filter((p) => {

        if (sueldo >= 5000) {
            opcionesCredito('Opción del 1 al 4.');

            return p.valor <= valorInfinite;

        } else if (sueldo >= 3000 && sueldo < 5000) {
            opcionesCredito('Opción del 2 al 4.');

            return p.valor <= valorPlatinum;
            
        } else if (sueldo >= 1000 && sueldo < 3000) {
            opcionesCredito('Opción del 3 al 4.');

            return p.valor <= valorGlod;

        } else if (sueldo >= 500 && sueldo < 1000) {
            opcionesCredito('Opción única 4.');

            return p.valor <= valorClassic;

        } else if (sueldo < 500){
            errorText.style.display = 'block';
            errorText.textContent = 'Lo sentimos, tu sueldo es insuficiente para la solicitud de un crédito';
        }


    });

    // console.log(resultado);

    for (let credito of resultado) {

        textOption = document.querySelector('.container-title');
        textOption.textContent = 'Elije un número con la opción del 1 al 4.'


        optionCredit = document.createElement('div');
        optionCredit.textContent = `
            ${credito.id}: ${credito.tipoCredito} - prestamo máximo: ${'$' + credito.valor}
        `;

        containerText = document.querySelector('.container-text');
        containerText.appendChild(optionCredit);


        
    };

    


}

function opcionesCredito(text){
    input.value = '';
    errorText.style.display = 'none';
    input.placeholder = text;
}


function valorPorMeses(valor){
    
    let meses = parseInt(input.value);

    // while(meses < 12 ){
    //     meses = prompt(`Meses a diferir ${'$' + valor} de 12 meses en adelante: `);
    // }

    const porcentInteres = 7;
    let valorMensual = (valor / meses);
    let interes = (valorMensual) * (porcentInteres / 100);
    let cuota = Number((interes + valorMensual).toFixed(2));

    let mensuales = [];
    let fecha = new Date();
    let mes = fecha.getMonth();
    let fechaFormato = '';
    let mesMor = 0;


    for (let i = 0; i < meses; i++) {
        mensuales.push({id: i, mensual: cuota});
    }

    let totalPago = 0;
    mensuales.forEach((pagoMensual) => {
        totalPago += pagoMensual.mensual;
    });



    for (const lista of mensuales) {

        mesMor = mes + (lista.id + 1);
        mesMor

        while (mesMor > 12) {
            mesMor = mesMor - 12;
        }

        
        fechaFormato = `15/${mesMor}`;
        lista.fecha = fechaFormato;

        // console.log('Pago ' + (lista.id + 1) + ': $' + lista.mensual + ' => fecha: ' + lista.fecha);

        let detalleCuotas = document.createElement('div');
        detalleCuotas.textContent = 'Pago ' + (lista.id + 1) + ': $' + lista.mensual + ' => fecha: ' + lista.fecha;

        containerText = document.querySelector('.pagos');
        containerText.appendChild(detalleCuotas);

    }

    

    detallesText.textContent = `
    PRESTAMO DE $${valor} CON UN INTERES DEL 7%

    * ${meses} Cuotas de $${cuota} mensuales
    
    * Total a pagar: $${totalPago.toFixed(2)}
    `;

    


}


