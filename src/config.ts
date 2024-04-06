import dotenv from 'dotenv';
dotenv.config();
class Config {
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public MYSQL_DB: string | undefined;
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  constructor() {
    this.MYSQL_DB = process.env.MYSQL_DB;
    this.JWT_TOKEN = process.env.JWT_TOKEN;
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
    this.NODE_ENV = process.env.NODE_ENV;
  }
}
export const config: Config = new Config();
