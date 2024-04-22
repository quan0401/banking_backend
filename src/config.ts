import dotenv from 'dotenv';
import { v2 } from 'cloudinary';
dotenv.config();
class Config {
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public MYSQL_DB: string | undefined;
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public CLOUD_NAME: string | undefined;
  public CLOUD_API_KEY: string | undefined;
  public CLOUD_API_SECRET: string | undefined;
  public CLOUD_FOLDER: string | undefined;
  constructor() {
    this.MYSQL_DB = process.env.MYSQL_DB;
    this.JWT_TOKEN = process.env.JWT_TOKEN;
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
    this.NODE_ENV = process.env.NODE_ENV;
    this.CLOUD_NAME = process.env.CLOUD_NAME;
    this.CLOUD_FOLDER = process.env.CLOUD_FOLDER;
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY;
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
  }

  public cloudinaryConfig(): void {
    v2.config({
      secure: this.NODE_ENV !== 'development',
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET,
      cloud_name: this.CLOUD_NAME
    });
  }
}
export const config: Config = new Config();
