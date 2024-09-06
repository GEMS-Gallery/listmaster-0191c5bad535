import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ShoppingItem {
  'id' : bigint,
  'text' : string,
  'completed' : [] | [Time],
}
export type Time = bigint;
export interface _SERVICE {
  'addItem' : ActorMethod<[string], bigint>,
  'deleteItem' : ActorMethod<[bigint], undefined>,
  'getItems' : ActorMethod<[], Array<ShoppingItem>>,
  'markCompleted' : ActorMethod<[bigint], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
