const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginForm = (email, password, user) => {
    const errors = {};
  console.log(user)
    if (!email) {
      errors.email = 'Ingrese su dirección de correo electrónico.';
    }else if(!emailRegex.test(email)){
        errors.email = 'Ingrese una dirección de correo electrónico válida.';
    }
  
    if (!password) {
      errors.password = 'Ingrese su contraseña.';
    } 
      
    
    if(user){
      if(user.status === 404 ){
        errors.email = 'Correo no registrado.';
      }else if(user.status === 403){
        errors.password = 'Contraseña incorrecta.';
      }
    }
      
    return errors;
  };