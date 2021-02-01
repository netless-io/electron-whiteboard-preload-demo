import { Context } from "../types";

export default async <C extends Context>(context: C, itemNames: ((context: C) => any)[]) => {
  try {
    for (const item of itemNames) {
      await item(context);
    }
  } catch (e) {
    console.error(e);
  }
};
