import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import '../css/Register.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    createUser(user: { email: $email, password: $password, name: $name }) {
      name
      email
    }
  }
`;

function RegisterView() {
  const navigate = useNavigate();
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async event => {
    event.preventDefault();
    const { data } = await register({ variables: formState });
    if (data) {
      navigate('/');
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input
            type="text"
            name="username"
            value={formState.name}
            onChange={event =>
              setFormState({
                ...formState,
                name: event.target.value,
              })
            }
          />
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
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
        <input type="submit" value="Registrarse" />
        <Link to="/">Regreso</Link>
      </form>
      {loading && <p>Registrando...</p>}
      {error && <p>Error al registrar: {error.message}</p>}
    </div>
  );
}

function RegisterReturn() {
  return(
  <ApolloProvider client={client}>
    <RegisterView/>
  </ApolloProvider>
)}

export default RegisterReturn;