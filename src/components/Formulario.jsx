import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 10px;
    transition: background-color .1s ease;
    margin-top: 20px;

    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`



const Formulario = ({setMonedas}) => {

    const monedas = [
      {id: 'USD', nombre: 'Dolar de Estados Unidos'},
      {id: 'EUR', nombre: 'Euro'},
      {id: 'GBP', nombre: 'Libra Esterlina'},
      {id: 'BRA', nombre: 'Real'},
      
    ]

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
    const [ criptomoneda, SelectCriptomonedas ] = useSelectMonedas('Elige tu Criptomoneda', criptos)
    
    useEffect(() => {
      const consultarAPI = async () => {
        
        const respuesta = await fetch("https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD")
        const resultado = await respuesta.json()
        
        const arrayCriptos = resultado.Data.map( cripto => {
          const objeto = {
            id: cripto.CoinInfo.Name,
            nombre: cripto.CoinInfo.FullName
          }
          return objeto
        })
        setCriptos(arrayCriptos)

      }
      consultarAPI();
    }, [])
    
    const handleSubmit = e => {
      e.preventDefault()

      if([moneda, criptomoneda].includes('')) {
        setError(true)

        return 
      }
      setError(false)
      setMonedas({
        moneda,
        criptomoneda
      })
    }

  return (
    <>
      {error && <Error>Seleccione Moneda y Criptomoneda</Error>}
      <form
        onSubmit={handleSubmit}
      >
          <SelectMonedas />
          <SelectCriptomonedas />


          <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  )
}

export default Formulario