import * as bcrypt from 'bcrypt';


export const hashPasswd = async (pass: string): Promise<string> => {
  return bcrypt.hash(pass, 10);
}

export const comparePasswd = async (
  simplePass: string,
  passHash: string,
): Promise<any | boolean> => {
  return bcrypt.compare(simplePass, passHash);
}

