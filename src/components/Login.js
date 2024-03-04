import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de tener instalado 'react-router-dom'
import '../css/Login.css';

function LoginView() {
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el registro del usuario.
    // Después de manejar el registro, redirige al usuario a la página de visualización.
    navigate('/view');
  };
  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input type="text" name="username" />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Iniciar sesión" />
        <Link to="/register">Registrarse</Link> {/* Este es el nuevo botón */}
      </form>
    </div>
  );
}

export default LoginView;
