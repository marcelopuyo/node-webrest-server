import express, { Router } from 'express';
import path from 'path';

interface Options {
  PORT: number;
  PUBLIC_PATH: string;
  routes: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const {PORT, PUBLIC_PATH, routes} = options;
    this.port = PORT;
    this.publicPath = PUBLIC_PATH;
    this.routes = routes;
  };

  async start() {

    //parsea body/response formato raw a json (middleware)
    this.app.use(express.json());

    //parsea body/response formato x-www-form-urlencoded a json (middleware)
    this.app.use(express.urlencoded({ extended: true }));

    //public folder (middleware)
    this.app.use(express.static(this.publicPath));

    //Routes API (middleware)
    this.app.use(this.routes);

    //Routes SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}...\nPresione Ctrl+C para detener`);
    });
  }
}
