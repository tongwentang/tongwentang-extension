export interface TActionPayload<Request, Response = Request> {
  request: Request;
  response: Response;
}

export interface TAction<Type, Payload> {
  type: Type;
  payload: Payload;
}

export type ActionMap = Record<string, TActionPayload<unknown, unknown>>;
export type TActionMap<Map extends ActionMap> = Map;

export type ReqActionOf<Map extends ActionMap, Type extends keyof Map> = TAction<Type, Map[Type]['request']>;
export type RepPayloadOf<Map extends ActionMap, Type extends keyof Map> = Map[Type]['response'];

export type ReqAction<All extends ActionMap> = {
  [Type in keyof All]: TAction<Type, All[Type]['request']>;
}[keyof All];

export type ReqActionHandler<Map extends ActionMap> = <
  const ReqA extends ReqAction<Map>,
  Rep extends Map[ReqA['type']]['response'],
>(
  reqA: ReqA,
  rep: Rep | Promise<Rep>,
) => typeof rep;

export type ReqActionDispatcher<Map extends ActionMap, Args extends unknown[] = []> = <const A extends ReqAction<Map>>(
  action: A,
  ...args: Args
) => Promise<RepPayloadOf<Map, A['type']>>;
