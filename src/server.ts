import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import EntradaRoute from './routes/entrada.router';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new EntradaRoute()]);

app.listen();
