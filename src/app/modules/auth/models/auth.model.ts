export class AuthModel {
  token: string;
  refreshToken: string;
  expiresIn: Date;

  nombre: string;
  apellido: string;
  username: string;
  email: string;
  usuarioId: string;
  autenticado: boolean;
  errors: string;
  
  
  setAuth(auth: AuthModel) {
    this.token = auth.token;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;

    this.nombre = auth.nombre;
    this.apellido = auth.apellido;
    this.username = auth.username;
    this.email = auth.email;
    this.usuarioId = auth.usuarioId;
    this.autenticado = auth.autenticado;
    this.errors = auth.errors;
  }
}
