import jwt_decode from 'jwt-decode';

export class Token {
    public accesstoken !: string;
    public refreshtoken !: string;

    public static getDecodedAccessToken(token : string): any {
        try {
          return jwt_decode(token);
        } catch(Error) {
          return null;
        }
    }

    public static getRole(){
        const token : Token = JSON.parse(localStorage.getItem("token")!);
        return Token.getDecodedAccessToken(token.accesstoken).roles[0];
    }
}
