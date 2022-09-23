import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import img from './img/imagen-criptos.png'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 120px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: white;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after { //pseudo elemento
    content: '';
    max-width: screen;
    width: 100%;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [ monedas, setMonedas ] = useState({})
  const [ resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0) {
      const { moneda, criptomoneda } = monedas
      const cotizarCripto = async () => {

        setCargando(true)

        const respuesta= await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        setCargando(false)
      }
      cotizarCripto()
      
    }
  }, [monedas])
  
  return (
    <div>
      <Contenedor>
        <Imagen 
        src={img}
        alt="Imagenes criptomonedas"
        />
        <div>
          <Heading>Cotiza Crtiptomonedas</Heading>
          <Formulario 
            setMonedas={setMonedas}
          />
          {cargando && <Spinner />}
          {resultado.PRICE && <Resultado resultado={resultado} />}

          

        </div>
      </Contenedor>
    </div>
  )
}

export default App
