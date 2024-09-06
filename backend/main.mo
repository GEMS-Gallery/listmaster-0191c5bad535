import Hash "mo:base/Hash";
import Text "mo:base/Text";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Time "mo:base/Time";

actor {
  type ShoppingItem = {
    id: Nat;
    text: Text;
    completed: ?Time.Time;
  };

  stable var nextId: Nat = 0;
  let itemMap = HashMap.HashMap<Nat, ShoppingItem>(10, Nat.equal, Nat.hash);

  public func addItem(text: Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let newItem: ShoppingItem = {
      id = id;
      text = text;
      completed = null;
    };
    itemMap.put(id, newItem);
    id
  };

  public query func getItems() : async [ShoppingItem] {
    Iter.toArray(itemMap.vals())
  };

  public func markCompleted(id: Nat) : async () {
    switch (itemMap.get(id)) {
      case (null) {
        // Item not found, do nothing
      };
      case (?item) {
        let updatedItem: ShoppingItem = {
          id = item.id;
          text = item.text;
          completed = ?Time.now();
        };
        itemMap.put(id, updatedItem);
      };
    };
  };

  public func deleteItem(id: Nat) : async () {
    itemMap.delete(id);
  };

  system func preupgrade() {
    // Convert HashMap to array for stable storage
    nextId := nextId;
  };

  system func postupgrade() {
    // Reinitialize HashMap from stable storage
  };
}
