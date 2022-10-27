import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import fechar from '../img/fechar.png'
import voltar from '../img/voltar.png'

function CadPlano() {
    const navigate = useNavigate();
    const { IdPlanos } = useParams();

    const [plano, setPlano] = useState({})
    const planoLocalStorage = JSON.stringify(plano)
    localStorage.setItem('Plano', planoLocalStorage)


    const userLocal = localStorage.getItem('user')
    const user = JSON.parse(userLocal)
    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${IdPlanos}`
    const [obj, setObj] = useState([])
    const [beneficios, setbeneficios] = useState([])
    const [nome, setNome] = useState('')
    const [digitos, setDigitos] = useState('')
    const [codigo, setCodigo] = useState('')
    const [validade, setValidade] = useState('')
    const [none, setNone] = useState(true)
    const body = {
        membershipId: IdPlanos,
        cardName: nome,
        cardNumber: digitos,
        securityNumber: codigo,
        expirationDate: validade
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }
    useEffect(() => {

        const promise = axios.get(URL, config)
        promise.then((resp) => {
            setObj(resp.data)
            setbeneficios(resp.data.perks)
            setPlano(resp.data)
            
        })

        promise.catch((error) => console.log(error.response.data))

    }, [])
   

    function confirme (e){
        e.preventDefault()
        setNone(false)
    }
    function fecha (){
        setNone(true)
    }
    function volta(){
        navigate('/subscriptions')
    }

    function confirmeAssinatura (){
        const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions'
      
            const promise = axios.post(URL, body,config)
            promise.then((resp) => {
              
            })
    
            promise.catch((error) => console.log(error.response.data))
    
       navigate('/home')
    }
    console.log(user.membership)
    console.log(plano)
    return (
        <Conteiner>
            <Fechar onClick={fecha} none={none} src={fechar} />
            <Voltar onClick={volta} none={none} src={voltar} />
            <Div1 none={none}>
                <img src={obj.image} atl={obj.id} />
                <h1>{obj.name}</h1>
            </Div1>
            <Conteudo none={none}>
                <h2>Beneficios:</h2>
                {beneficios.map((b, i) =>
                    <p key={i}>{i + 1}. {b.title}</p>
                )}
                <h2>Preço:</h2>
                <p>R$ {obj.price} cobrados mensalmente</p>
                <Form    >

                    <BigInput
                        onChange={e => setNome(e.target.value)}
                        value={nome}
                        id="Nome"
                        placeholder="Nome impresso no cartão"
                        name='Nome' type='text'
                        required></BigInput>


                    <BigInput
                        onChange={e => setDigitos(e.target.value)}
                        value={digitos}

                        id="digitos"
                        placeholder="Digitos do cartão"
                        name='digitos' type='text'
                        required></BigInput>

                    <Input
                        onChange={e => setCodigo(e.target.value)}
                        value={codigo}
                        id="digitos"
                        placeholder="Código de segurança"
                        name='digitos' type='text'
                        required></Input>

                    <Input
                        onChange={e => setValidade(e.target.value)}
                        value={validade}
                        id="digitos"
                        placeholder="Validade"
                        name='digitos' type='text'
                        required></Input>

                    <Assinar
                        onClick={(e)=>confirme(e)}
                        type='submit'
                        > Assinar </Assinar>
               
                   
                    
                </Form>
                
            </Conteudo>
            <Confirmar none={none}>
                        <p >Tem certeza que deseja asssinar o plano <br/>
                            {obj.name} (R$ {obj.price})?
                        </p>

                        <BotaoNao 
                        onClick={fecha}
                        type='submit'> Não </BotaoNao>

                         <BotaoSim onClick={confirmeAssinatura}
                        type='submit'> Sim </BotaoSim>
                    </Confirmar>
        </Conteiner>
    )
}

export default CadPlano
const BotaoNao = styled.button`
width: 100px;
height: 52px;
background: #CECECE;
border-radius: 8px;
border: none;
color: white;
`
const BotaoSim = styled.button`
 width: 100px;
height: 52px;
background: #FF4791;
border-radius: 8px;
border: none;
color: white;
`


const Conteiner = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 863px;

`

const Div1 = styled.div`
opacity : ${props => props.none ? '' : '0.2'};
display: flex;
flex-direction: column;
align-items: center;

img{
    width: 139px;
    height: 95px;
    margin-bottom: 12px;
}
h1{
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 22px;
}
`

const Confirmar = styled.div`
    width: 248px;
    height: 210px;
    position: absolute;
    top: 35%;
 
    background: #FFFFFF;
    border-radius: 12px;

    color: black;
    font-size: 18px;
    font-family: 'Roboto' , sans-serif;
    text-align: center;
    font-weight: 700;

    display: ${props => props.none ? 'none' : 'flex' };
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;

    
button{
    width: 95px;
    height: 52px;
}
`

const Conteudo = styled.div`
opacity : ${props => props.none ? '' : '0.2'};
margin-left: 40px;
position: relative;

h2{
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 19px;
    margin-top: 12px;
}
p{
    line-height: 16px;
    font-size: 14px;
    font-family: 'Roboto' , sans-serif;
}
`

const Form = styled.form`
margin-top: 34px;
    display: flex;
    flex-wrap: wrap;
    width: 299px;
    justify-content: space-between;
   
`
const Assinar = styled.button`

        font-family: 'Roboto', sans-serif;
        width: 299px;
        height: 52px;
        background-color: #FF4791;
        border-radius: 8px;
        border: none;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        font-weight: 700;
    
`

const Input = styled.input`
 margin-bottom: 16px ;
    width: 145px;
    height: 52px;
    border-radius: 8px;
    ::placeholder{
        font-family: 'Roboto', sans-serif;
        line-height: 25px;
        color: #DBDBDB;
    }
`

const BigInput = styled.input`

    margin-bottom: 16px ;
    width: 299px;
    height: 52px;
    border-radius: 8px;
    ::placeholder{
        font-family: 'Roboto', sans-serif;
        line-height: 25px;
        color: #DBDBDB;
    }
    
`

const Fechar = styled.img`
    position: fixed;
    right: 6.25%;
    top: 6.25%;
    display: ${props => props.none ? 'none' : '' };
`

const Voltar = styled.img`
    position: fixed;
    left: 6.25%;
    top: 6.25%;
    opacity : ${props => props.none ? '' : '0.2'}; // MUDAR QUANDO ABRIR A TELA DE ASSINAR
`

