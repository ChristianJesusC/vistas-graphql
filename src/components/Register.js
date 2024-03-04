import React from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de tener instalado 'react-router-dom'
import '../css/Register.css';

function RegisterView() {
    const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el registro del usuario.
    // Después de manejar el registro, redirige al usuario a la página de visualización.
    navigate('/view');
  };
  
  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input type="text" name="username" />
        </label>
        <label>
          Correo electrónico:
          <input type="email" name="email" />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Registrarse" />
      </form>
    </div>
  );
}

export default RegisterView;
