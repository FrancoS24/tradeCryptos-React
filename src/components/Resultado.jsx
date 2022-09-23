import styled from "@emotion/styled"

const Contenedor = styled.div`
  width: 100%;
  color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-align: start;
  flex-direction: row-reverse;
 
  gap: 1rem;
  margin-top: 30px;
`
const Imagen = styled.img`
  display: block;
  width: 170px;
  
`
const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Texto = styled.p`
  font-size: 20px;
  
  span {
    font-weight: 700;
    color: #66A2FE;
    display: flex;
    flex-direction: column;
  }
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


const Precio = styled.p`
  font-size: 25px;
  
  span {
    display: flex;
    flex-direction: column;
    font-weight: 700;
    color: #66A2FE;
  }
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

const Resultado = ({resultado}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL} = 
    resultado
  return (
    <Contenedor>
      <Imagen 
        src={`https://cryptocompare.com/${IMAGEURL}`} 
        alt="imagen" />
      <Div>
        <Precio>El Precio es de: 
          <span>{PRICE}</span>
        </Precio>
        <Texto>Precio más alto del día: 
          <span>{HIGHDAY}</span>
        </Texto>
        <Texto>Precio más bajo del día: 
          <span>{LOWDAY}</span>
        </Texto>
        <Texto>Variación últimas 24 horas: 
          <span>{CHANGEPCT24HOUR}</span>
        </Texto>
      </Div>  
    </Contenedor>
  )
}

export default Resultado