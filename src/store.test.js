import store, { history } from "./store";
import { isFunction, isObject } from "util";

test("check store have a dispatch", () => {
  expect(isFunction(store.dispatch)).toBeTruthy();
});

test("check history is an object", () => {
  expect(isObject(history)).toBeTruthy();
});
