export function NavData(nav:any, data:any, rol:string){
  nav.forEach((element:any) => {
    if(element.permiso.includes(rol)){
      data.push(element);
    }
  });
}
