import styled from "styled-components"
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaginaHome (){
    const navigate = useNavigate();
    const planoLocal = localStorage.getItem('Plano')
    const Plano = JSON.parse(planoLocal)
    const beneficios = Plano.perks

    const userLocal = localStorage.getItem('user')
    const user = JSON.parse(userLocal)
    const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions'
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }
    function mudar (){
        navigate('/subscriptions')
    }

  function cancelar (){
    const promise = axios.delete(URL, config)
    promise.then(() => {
    const planoLocalStorage = ''
    localStorage.setItem('Plano', planoLocalStorage)
     navigate('/subscriptions')
        
    })

    promise.catch((error) => console.log(error.response.data))
  }
    console.log(beneficios)
    return(
        <>
        <Conteiner>
            <Topo>
                <img src={Plano.image} alt='1'/>
                <VscAccount/>
            </Topo>
            <h1>Olá, {Plano.name}</h1>
 
             {beneficios.map((b, i) =>
                    <Opcoes key={i}
                    href={b.link}
                    >{b.title}</Opcoes>
                )}
             
            <Footer>
            <Opcoes onClick={mudar}>Mudar plano</Opcoes>
            <Cancela onClick={cancelar}>Cancelar</Cancela>
            </Footer>
        </Conteiner>
        
        </>
    )
}

export default PaginaHome

const Conteiner = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
h1{
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 53px;
}
`
const Topo = styled.div`
padding: 35px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    img{
        width: 50px;
    }
    ion-icon{
        color: red;
    }
`
const Opcoes =  styled.a`
font-family: 'Roboto', sans-serif;
        width: 299px;
        height: 52px;
        background-color: #FF4791;
        border-radius: 8px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 14px;
        margin-bottom: 8px;
`
        
    

const Footer = styled.div`
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;

`
const Cancela = styled.button`
        font-family: 'Roboto', sans-serif;
        width: 299px;
        height: 52px;
        background-color: #FF4747;
        border-radius: 8px;
        border: none;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        margin-bottom: 8px;
`

