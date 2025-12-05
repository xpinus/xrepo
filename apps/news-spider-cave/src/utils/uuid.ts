import { v5 as uuidv5 } from "uuid";

const MY_NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";

export function generateUuid5(name: string, namespace = MY_NAMESPACE): string {
    return uuidv5(name, namespace);
}
