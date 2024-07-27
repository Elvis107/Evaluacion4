import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState({
    id: '',
    nombre: '',
    genero: 'masculino',
    correo: ''
  });

  // Cargar usuarios
  useEffect(() => {
    const usuariosAlmacenados = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(usuariosAlmacenados);
  }, []);

  // cambios en el formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario({
      ...datosFormulario,
      [name]: value
    });
  };

  // envío del formulario para agregar un nuevo usuario
  const manejarEnvio = (e) => {
    e.preventDefault();
    if (usuarios.some(usuario => usuario.id === datosFormulario.id)) {
      alert('El ID ya existe.');
    } else {
      console.log(datosFormulario); // Imprimir datos ingresados en la consola
      const nuevosUsuarios = [...usuarios, datosFormulario];
      setUsuarios(nuevosUsuarios);
      localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
      setDatosFormulario({ id: '', nombre: '', genero: 'masculino', correo: '' });
      alert('Usuario agregado exitosamente.');
    }
  };

  // actualización de un usuario
  const manejarActualizacion = (id) => {
    const nuevoNombre = prompt('Ingrese el nuevo valor para nombre:');
    const nuevoGenero = prompt('Ingrese el nuevo valor para genero (masculino/femenino):');
    const nuevoCorreo = prompt('Ingrese el nuevo valor para correo:');
    const usuarioActualizado = { id, nombre: nuevoNombre, genero: nuevoGenero, correo: nuevoCorreo };
    const nuevosUsuarios = usuarios.map(usuario => usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario);
    setUsuarios(nuevosUsuarios);
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
    alert('Usuario actualizado exitosamente.');
  };

  // eliminación de un usuario
  const manejarEliminacion = (id) => {
    const nuevosUsuarios = usuarios.filter(usuario => usuario.id !== id);
    setUsuarios(nuevosUsuarios);
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
    alert('Usuario eliminado exitosamente.');
  };

  return (
    <div className="container">
      <h1>Agregar Usuario</h1>
      <form onSubmit={manejarEnvio}>
        <div className="form-group">
          <label>ID</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ingrese el ID"
            name="id"
            value={datosFormulario.id}
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese el nombre"
            name="nombre"
            value={datosFormulario.nombre}
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="form-group">
          <label>Género</label>
          <select
            className="form-control"
            name="genero"
            value={datosFormulario.genero}
            onChange={manejarCambio}
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>
        <div className="form-group">
          <label>Correo</label>
          <input
            type="email"
            className="form-control"
            placeholder="Ingrese el correo"
            name="correo"
            value={datosFormulario.correo}
            onChange={manejarCambio}
            required
          />
          <br />
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
      <br />
      <h2>Lista de Usuarios</h2>
      <ul className="list-group mt-4">
        {usuarios.map(usuario => (
          <li key={usuario.id} className="list-group-item">
            <div>{`ID: ${usuario.id}, Nombre: ${usuario.nombre}, Género: ${usuario.genero}, Correo: ${usuario.correo}`}</div>
            <button className="btn btn-secondary mr-2" onClick={() => manejarActualizacion(usuario.id)}>Editar</button>
            <button className="btn btn-danger" onClick={() => manejarEliminacion(usuario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
