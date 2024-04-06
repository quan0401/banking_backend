import dotenv from 'dotenv';
dotenv.config();
class Config {
  public MYSQL_DB: string | undefined;
  public JWT_TOKEN: string | undefined;
  constructor() {
    this.MYSQL_DB = process.env.MYSQL_DB;
    this.JWT_TOKEN = process.env.JWT_TOKEN;
  }
}
export const config: Config = new Config();
