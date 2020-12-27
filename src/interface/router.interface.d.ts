export interface routerType {
  readonly name: string;
  readonly path: string;
  component?: any;
  meta?: object;
  readonly auth?: boolean;
  readonly children?: Array<routerType>;
  readonly isHidden?: boolean;
}
