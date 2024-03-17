import bcrypt from 'bcryptjs';

export class Password {
  static async hash(password: string): Promise<string | Error> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      return error;
    }
  }

  static async decrypt(
    password: string,
    hashedPassword: string,
  ): Promise<boolean | Error> {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      return error;
    }
  }
}
