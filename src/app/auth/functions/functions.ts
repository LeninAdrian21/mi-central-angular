import Swal from "sweetalert2";

export const Auth ={
  Relations(form:any){
    const formularioRegister = Object.assign({},form.value);
    const rol ={
      tipo_rol:{
        _id:formularioRegister.rol
      }
    }

    formularioRegister.numero = formularioRegister.numero.toString();
    formularioRegister.cp = formularioRegister.cp.toString();
    delete formularioRegister.rol;
    let body = Object.assign(formularioRegister,rol);
    return body;
  },
  login(service:any,form:any,router:any, variable:any, rol:any){
    service.Login(form.value).subscribe(
      (data:any)=>{
        console.log(data);
        const {refreshToken} = data;
        const {token} = data;
        localStorage.setItem('token', token);
        variable.JwtObservableData = {jwt:token} ;
        localStorage.setItem('refresh',refreshToken);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se a iniciado session correctamente',
          showConfirmButton: false,
          timer: 3000
        });
        setTimeout(() => {
          router.navigate(['/home']);
        }, 4000);
      }, (error:any) =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El usuario o la contraseña son incorrectas',
        });
        console.log(error);
      }
    )
  },
  register(service:any,body:any,router:any){
    service.Register(body).subscribe(
      (data:any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha registrado correctamente el usuairo',
          showConfirmButton: false,
          timer: 1000
        });
        setTimeout(() => {
          router.navigate(['/auth/login']);
        }, 1200);
      },
      (error:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El usuario no se a podido registrar o el usuario ya esta registrado',
        });
      }
    );
  }
}
