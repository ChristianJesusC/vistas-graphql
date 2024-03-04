import React from 'react';
import '../css/View.css';

function ViewView() {
  // Aquí puedes reemplazar con los datos reales de los usuarios
  const users = [
    { info: 'Info1', type: 'Tipo1', name: 'Nombre1', username: 'Usuario1' },
    { info: 'Info2', type: 'Tipo2', name: 'Nombre2', username: 'Usuario2' },
  ];

  return (
    <div className="container">
      <h2>Visualización</h2>
      <table>
        <thead>
          <tr>
          <th>Info</th>
            <th>Tipo</th>
            <th>Nombres</th>
            <th>Usuario del stands</th>
          </tr>
        </thead>
        <tbody>
          {users.map((stand, index) => (
            <tr key={index}>
              <td>{stand.info}</td>
              <td>{stand.type}</td>
              <td>{stand.name}</td>
              <td>{stand.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewView;
