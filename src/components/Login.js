import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import '../css/Login.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';

function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    const expirationDate = decodedToken.exp * 1000;
    return expirationDate < new Date().getTime();
  } catch {
    return true;
  }
}

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
        email
      }
    }
  }
`;

function LoginView() {
  const navigate = useNavigate();
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token && !isTokenExpired(token)) {
      navigate('/view');
    }
  }, [navigate]);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: formState });
      if (data) {
        localStorage.setItem('auth-token', data.login.token);
        navigate('/view');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal!'
      })
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input
            type="text"
            name="username"
            value={formState.email}
            onChange={event =>
              setFormState({
                ...formState,
                email: event.target.value,
              })
            }
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={event =>
              setFormState({
                ...formState,
                password: event.target.value,
              })
            }
          />
        </label>
        <input type="submit" value="Iniciar sesión" />
        <Link to="/register">Registrarse</Link>
      </form>
      {loading && <p>Iniciando sesión...</p>}
    </div>
  );
}

function LoginReturn() {
  return (
    <ApolloProvider client={client}>
      <LoginView/>
    </ApolloProvider>
  );
}

export default LoginReturn;
