// 我的实现：
type LookUp<U, T> = U extends { type: T } ? U : never;

//
// type LookUp2<U, T extends string> = {
//     [K in T]: U extends { type: T } ? U : never
// }[T]

// 用例：
interface Cat {
    type: 'cat';
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
    type: 'dog';
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
    color: 'brown' | 'white' | 'black';
}

type MyDog = LookUp<Cat | Dog, 'dog'>; // expected to be `Dog`
