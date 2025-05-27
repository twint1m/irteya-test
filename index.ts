import { Bench } from 'tinybench';

function countOccurrences<A extends number | string>(
    arrayA: A[],
    arrayB: A[]
): Record<A, number> {
    const freqB = new Map<A, number>();

    for (const item of arrayB) {
        freqB.set(item, (freqB.get(item) ?? 0) + 1);
    }

    const result: Record<A, number> = {} as Record<A, number>;
    const seen = new Set<A>();

    for (const item of arrayA) {
        if (!seen.has(item)) {
            seen.add(item);
            result[item] = freqB.get(item) ?? 0;
        }
    }

    return result;
}

const A = [1, 2, 2, 3, 5, 5];
const B = [5, 1, 5, 7, 3, 2, 2, 2];
console.log('Результат:', countOccurrences(A, B));

const bench = new Bench();

const gen = (size: number) =>
    Array.from({ length: size }, () => Math.floor(Math.random() * 100));

const aTest = gen(1000);
const bTest = gen(100000);

bench.add('countOccurrences', () => {
    countOccurrences(aTest, bTest);
});

bench.run().then(() => {
    console.table(bench.table());
});
