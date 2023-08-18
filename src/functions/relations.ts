export const relations = (form: any, collection: string, date?: any) => {
  const collections: any = {
    Abonos: (form: any, body: any) => {
      const { id_credito, id_usuario } = form;
      delete form.id_credito;
      delete form.id_usuario;
      body = Object.assign(form, {});
      if (id_credito) {
        const credito = {
          credito: {
            _id: id_credito,
          },
        };
        body = Object.assign(body, credito);
      }
      if (id_usuario) {
        const usuario = {
          usuario: {
            _id: id_usuario,
          },
        };
        body = Object.assign(body, usuario);
      }
      const fecha = {
        fecha_abono: date,
      };
      body = Object.assign(body, fecha);
      return body;
    },
    Usuarios: (form: any, body: any) => {
      const {rol:role} = form;
      delete form.rol;
      form.numero = form.numero.toString();
      form.cp = form.cp.toString();
      body = Object.assign(form, {});
      const rol ={
        tipo_rol:{
          _id:role
        }
      }
      body = Object.assign(body, rol);
      return body;
    }
  };
  return collections[collection](form);
};
