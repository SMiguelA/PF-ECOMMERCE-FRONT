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
    } else if (password.length > 15) {
        errors.password = 'La contraseña no puede superar los 15 caracteres.';
      } else {
        const numberRegex = /\d/g;
        const numberCount = (password.match(numberRegex) || []).length;
        if (numberCount < 2) {
          errors.password = 'La contraseña debe contener al menos 2 números.';
        }
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