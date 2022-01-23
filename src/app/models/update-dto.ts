export class UpdateDto {
    constructor(
        public correo: string,
        public nombre:string,
        public fechaNacimiento:Date,
        public sueldo:number,
        public contrasena:string,
    ){}
}

