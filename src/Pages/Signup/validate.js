const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginForm = (name, email, password, user) => {
    const errors = {};
  console.log(user)

    if(!name) {
        errors.name = "Ingrese un nombre de usuario"
    }

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
      if(user=== "Email" ){
        errors.email = 'Este correo ya esta registrado, utilize otro.';
      }else if(user === "Name"){
        errors.name = 'Este nombre ya esta en uso, eliga otro.';
      }
    }
      
    return errors;
  };