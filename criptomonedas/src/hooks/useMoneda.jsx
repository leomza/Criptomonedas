import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  --webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`

//Entre parentesis y con el nombre que yo quiera pongo las variables que recibo desde los componentes en que uso este Hook
const useMoneda = (label, stateInicial, opciones) => {
  //Aca crearé el State de el Hook creado:
  const [state, actualizarState] = useState(stateInicial)

  const SelectMoneda = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select
        onChange={e => {
          actualizarState(e.target.value)
        }}
        value={state}
      >
        <option value=''>Seleccione</option>
        {opciones.map(opcion => (
          <option key={opcion.codigo} value={opcion.codigo}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </Fragment>
  )

  //Aqui retornaré el State, la interfaz (no siempre mostraré una interfaz) y la funcion que modifica el State
  return [state, SelectMoneda]
}

export default useMoneda
