export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const ShoppingItem = IDL.Record({
    'id' : IDL.Nat,
    'text' : IDL.Text,
    'completed' : IDL.Opt(Time),
  });
  return IDL.Service({
    'addItem' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'deleteItem' : IDL.Func([IDL.Nat], [], []),
    'getItems' : IDL.Func([], [IDL.Vec(ShoppingItem)], ['query']),
    'markCompleted' : IDL.Func([IDL.Nat], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
