import axios from 'axios'
import {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../Logo.png'


function PaginaLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, Carregando] = useState(false);

    const [user, setUser] = useState({})
    const UserLocalStorage = JSON.stringify(user)
    localStorage.setItem('user', UserLocalStorage)
    
    const userLocal = localStorage.getItem('user')
    const userRece = JSON.parse(userLocal)


    const [plano, setPlano] = useState({})
    const planoLocalStorage = JSON.stringify(plano)
    localStorage.setItem('Plano', planoLocalStorage)

    const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/auth/login'
    const body = {
        email: email,
        password: password
    }

    function handleSubmit(e) {
        e.preventDefault();

        Carregando(true);
        const promise = axios.post(URL, body)

        promise.then((res) => {
            Carregando(false);
            setUser(res.data)
            
           if(res.data.membership===null){
            navigate('/subscriptions')
            setPlano('')
           }else {
            setPlano(res.data.membership)
            navigate('/home')
            
           }
        });
        promise.catch((erro) => {
            console.log(erro.data)
            Carregando(false);
            alert('Erro, tente novamente');
        });
    }

    return (
        <>
            <Conteiner>
                <div>
                    <img alt='logo' src={logo} />
                </div>
                <Form onSubmit={handleSubmit}>

                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        disabled={isLoading}
                        id="email"
                        placeholder="email"
                        name='email' type='email'
                        required></input>


                    <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        disabled={isLoading}
                        id="senha"
                        placeholder="senha"
                        name='senha' type='password'
                        required></input>

                    <button
                        type='submit'> Entrar </button>

                </Form>
                <Link to='/sign-up'>
                    <A>Não possui uma conta? Cadastre-se</A>
                </Link>
            </Conteiner>
        </>
    )
}

export default PaginaLogin

const Conteiner = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 863px;
   div{
    margin-bottom:100px;
   }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-items: center;
    
    input{
    margin-bottom: 16px ;
    width: 299px;
    height: 52px;
    border-radius: 8px;
    ::placeholder{
        font-family: 'Roboto', sans-serif;
        line-height: 25px;
        color: #DBDBDB;
    }
    }

    button{
        font-family: 'Roboto', sans-serif;
        width: 299px;
        height: 52px;
        background-color: #FF4791;
        border-radius: 8px;
        border: none;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
    }
`
const A = styled.p`
    margin-top: 24px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    text-align: center;
    text-decoration-line: underline;
    color:white;
  
`