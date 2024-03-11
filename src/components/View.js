import { useState,useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useMutation, useQuery, gql } from '@apollo/client';
import '../css/View.css';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    const expirationDate = decodedToken.exp * 1000; // Convertir a milisegundos
    return expirationDate < new Date().getTime();
  } catch {
    return true;
  }
}
const GET_STANDS = gql`
  query GetStands {
    stands {
      id
      nombre
      tipo
      usuario
      descripcion
    }
  }
`;

const CREATE_STAND = gql`
  mutation CreateStand($nombre: String!, $tipo: String!, $usuario: String!, $descripcion: String!) {
    createStand(stand: { nombre: $nombre, tipo: $tipo, usuario: $usuario, descripcion: $descripcion }) {
      id
      nombre
      tipo
      usuario
      descripcion
    }
  }
`;

const UPDATE_STAND = gql`
  mutation UpdateStand($id: ID!, $nombre: String!, $tipo: String!, $usuario: String!, $descripcion: String!) {
    updateStand(id: $id, stand: { nombre: $nombre, tipo: $tipo, usuario: $usuario, descripcion: $descripcion }) {
      id
      nombre
      tipo
      usuario
      descripcion
    }
  }
`;

const DELETE_STAND = gql`
  mutation DeleteStand($id: ID!) {
    deleteStand(id: $id) {
      id
      nombre
      tipo
      usuario
      descripcion
    }
  }
`;

function StandsComponent() {
  const { loading, error, data, refetch } = useQuery(GET_STANDS);
  const [createStand] = useMutation(CREATE_STAND, {
    onCompleted: () => refetch()
  });
  const [updateStand] = useMutation(UPDATE_STAND, {
    onCompleted: () => refetch()
  });
  const [deleteStand] = useMutation(DELETE_STAND, {
    onCompleted: () => refetch()
  });

  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [selectedStandId, setSelectedStandId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('auth-token'); // Eliminar el token expirado
      navigate('/');
    }
  }, [navigate]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/');
  };
  return (
    <div className="container">
      <form onSubmit={e => {
        e.preventDefault();
        if (selectedStandId) {
          updateStand({ variables: { id: selectedStandId, nombre, tipo, usuario, descripcion } });
        } else {
          createStand({ variables: { nombre, tipo, usuario, descripcion } });
        }
        setNombre('');
        setTipo('');
        setUsuario('');
        setDescripcion('');
        setSelectedStandId(null);
      }}>
        <input className="input" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
        <input className="input" value={tipo} onChange={e => setTipo(e.target.value)} placeholder="Tipo" />
        <input className="input" value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="Usuario" />
        <input className="input" value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" />
        <button className="button" type="submit">{selectedStandId ? 'Actualizar' : 'Crear'} Stand</button>
        {selectedStandId && (
          <button className="button cancel" type="button" onClick={() => {
            setNombre('');
            setTipo('');
            setUsuario('');
            setDescripcion('');
            setSelectedStandId(null);
          }}>
            Cancelar Actualización
          </button>
        )}
      </form>
      <div className="stands-list">
        {data.stands.map(({ id, nombre, tipo, usuario, descripcion }) => (
          <div className="stand" key={id}>
            <p>
              <strong>Nombre:</strong> {nombre}<br />
              <strong>Tipo:</strong> {tipo}<br />
              <strong>Usuario:</strong> {usuario}<br />
              <strong>Descripción:</strong> {descripcion}
            </p>
            <div className="button-group">
              <button className="button update" onClick={() => {
                setNombre(nombre);
                setTipo(tipo);
                setUsuario(usuario);
                setDescripcion(descripcion);
                setSelectedStandId(id);
              }}>
                Actualizar Stand
              </button>
              <button className="button delete" onClick={() => deleteStand({ variables: { id } })}>
                Eliminar Stand
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleLogout}>
      Cerrar sesión
      </button>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <StandsComponent />
    </ApolloProvider>
  );
}

export default App;
