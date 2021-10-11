import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

//En este proyecto creare el formulario usando un CUSTOM HOOK
//La ventaja de tener un propio Hook es que estará todo centralizado en un solo lugar (hasta ahora habia usado useState y useEffect)
//A fin de cuenta un Hook es un funcion, la cual tiene un state y un modificar ese state


const Contenedor = styled.div`
max-width: 900px;
margin: 0 auto;

@media(min-width: 992px) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
}
`

const Imagen = styled.img`
max-width: 100%;
margin-top: 5rem;
`

const Heading = styled.h1`
font-family: 'Bebas Neue', cursive;
color: #FFF;
text-align: left;
font-weight: 700;
font-size: 50px;
margin-bottom: 50px;
margin-top: 80px;

&::after {
  content: '';
  width: 100px;
  height: 6px;
  background-color: #66a2fe;
  display: block;
}
`

function App() {

  //Creo el State para poder leer la cotizacion del Formulario y poder enviar los props hacia el Resultado 
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  //Crearé un State para guardar el Resultado
  const [resultado, guardarResultado] = useState({});
  //Creo un State para mostrar el Spinner
  const [cargando, guardarCargando] = useState(false)

  //Con los datos de moneda y de criptomoneda haremos los calculos, para eso llamaré a useEffect ya que el componente puede recargar (las dependencias sera escuchar a "moneda" y "criptomoneda")
  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      //Con la siguiente linea prevengo la primer ejecucion al iniciar la aplicacion:
      if (moneda === '') return

      //Aca consultaré la API para realizar la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      //Aqui es donde mostraré el Spinner:
      guardarCargando(true)
      //Luego con un setTimeOut ocultaré el Spinner y mostraré el Resultado:
      setTimeout(() => {
        //Cambio nuevamente el estado del Spinner para ocultarlo al cabo de los 3 segundos:
        guardarCargando(false)

        //El resultado que entrega la API es dinamico de acuerdo a la criptomoneda y de acuerdo a la moneda, es por ello que para acceder al resultado deseado, lo hago de la siguiente forma accediendo al objeto JSON:
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
      }, 3000);
    }
    cotizarCriptomoneda()
  }, [moneda, criptomoneda])

  //Condicion para mostrar Spinner o el Resultado:
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen Crypto" />
      </div>

      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario guardarMoneda={guardarMoneda} guardarCriptomoneda={guardarCriptomoneda} />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
