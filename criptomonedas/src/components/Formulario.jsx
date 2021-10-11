import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'
import axios from 'axios'
import Error from './Error'
import PropTypes from 'prop-types'

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #325ac0;
    cursor: pointer;
  }
`

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
  //Creo un State para el listado de Criptomonedas
  const [listacripto, guardarCriptomonedas] = useState([])

  //Creo un State para la validacion del Formulario
  const [error, guardarError] = useState(false)

  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
    { codigo: 'ARS', nombre: 'Peso Argentino' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra Esterlina' }
  ]

  //Aca usaré el Hook personalizado creado (hago un destrucing del Hook, no hace falta que las variables tengas el mismo nombre, pero si es muy importante el orden en que se escriben)
  //Entre parentesis de useMoneda() le paso un valor al custom Hook y tambien le paso el state inicial (la moneda que eligio el usuario, al principio sera vacía por eso paso como un String vacio)
  const [moneda, SelectMonedas] = useMoneda('Elije tu Moneda', '', MONEDAS)

  const [criptomoneda, SelectCripto] = useCriptomoneda(
    'Elije tu Criptomoneda',
    '',
    listacripto
  )

  //Cuando el componente este listo y cargado realizare la consulta a la API (le paso dependencias vacias para que se ejecute una sola vez)
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const resultado = await axios.get(url)
      guardarCriptomonedas(resultado.data.Data)
    }
    consultarAPI()
  }, [])

  const cotizarMoneda = e => {
    e.preventDefault()

    //Primero valido si los campos estan llenos
    if (moneda === '' || criptomoneda === '') {
      guardarError(true)
      return
    }
    //Si todo esta bien pasaré los datos al componente principal
    guardarError(false)
    guardarMoneda(moneda)
    guardarCriptomoneda(criptomoneda)
  }

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type='submit' value='Calcular' />
    </form>
  )
}

Formulario.propTypes = {
  guardarMoneda: PropTypes.func.isRequired,
  guardarCriptomoneda: PropTypes.func.isRequired
}

export default Formulario
