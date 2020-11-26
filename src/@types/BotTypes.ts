import { CoreContextInterface } from './CoreContextInterface';

export type Middleware = (ctx: CoreContextInterface, next: Function) => void;
