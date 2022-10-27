import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'


function PaginaSubscriptions() {
    const userLocal = localStorage.getItem('user')
    const user = JSON.parse(userLocal)
    const navigate = useNavigate();
   

    const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships'
    const [planos, setPlanos] = useState([])

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }
    useEffect(() => {

        const promise = axios.get(URL, config)
        promise.then((resp) => {
            setPlanos(resp.data)
        })

        promise.catch((error) => console.log(error.response.data))

    }, [])

    function planoPlus(){

    }
    
    return (
        <>
            <Conteiner>
                <h1>Escolha seu Plano</h1>
                
                {planos.map((p, i) =>
                 <Link key={i} to={`/subscriptions/${p.id}`}>
                    <div 
                    onClick={()=> planoPlus(p.id)}>
                        <img src={p.image} atl={p.id} />
                        <p>R$ {p.price}</p>
                    </div>
                    </Link>
                )}

            </Conteiner>
        </>
    )
}

export default PaginaSubscriptions

const Conteiner = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 863px;

h1{
    font-family: 'Robot', sans-serif;
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 24px;
}
div{
    width: 290px;
    height: 180px;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
p{
    font-size: 24px;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;
    color: white;
}

`
