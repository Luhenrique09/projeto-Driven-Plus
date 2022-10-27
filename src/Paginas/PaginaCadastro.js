import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'


function PaginaCadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setcpf] = useState('')
    const [password, setPassword] = useState('')
    const [carregando, setCarregando] = useState(false);
    const URLCad= 'https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up'
    const body = {
        email: email,
        name: nome,
        cpf: cpf,
        password: password
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        setCarregando(true);
        const promise = axios.post(URLCad, body)

        promise.then(() => {
            setCarregando(false);
            navigate("/");
        });
        promise.catch((erro) => {
            alert(erro.response.data.message)
            setCarregando(false);
            
        });
    }
    return (
        <>
            <Conteiner>
                <Form onSubmit={handleSubmit} >
                    <input
                        onChange={e => setNome(e.target.value)}
                        value={nome}
                        disabled={carregando}
                        id="nome"
                        placeholder="nome"
                        name='nome' type='text'
                        required></input>

                    <input
                        onChange={e => setcpf(e.target.value)}
                        value={cpf}
                        disabled={carregando}
                        id="cpf"
                        placeholder="CPF"
                        name='cpf' type='text'
                        required></input>

                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        disabled={carregando}
                        id="email"
                        placeholder="email"
                        name='email' type='email'
                        required></input>


                    <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        disabled={carregando}
                        id="senha"
                        placeholder="senha"
                        name='senha' type='password'
                        required></input>

                    <button type='submit'>  {
            carregando
              ? '...'
              : "Cadastrar"
          } </button>

                </Form>
                <Link to='/'>
                    <A>Já tem uma conta? Faça login!</A>
                </Link>
            </Conteiner>
        </>
    )
}

export default PaginaCadastro

const Conteiner = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 863px;
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
        color: #7E7E7E;
;
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
    color: white;
`