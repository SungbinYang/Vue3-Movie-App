import { double, asyncFn } from './example';

// 테스트 그룹
describe('그룹1', () => {
    beforeAll(() => {
        console.log('beforeAll!!!');
    });
    afterAll(() => {
        console.log('afterAll!!!');
    });

    beforeEach(() => {
        console.log('beforeEach!!!');
    });
    afterEach(() => {
        console.log('afterEach!!!')
    });
    test('첫 테스트', () => {
        console.log('첫 테스트!');
        expect(123).toBe(123);
    });

    test('인수가 숫자 데이터입니다.', () => {
        console.log('인수가 숫자 데이터입니다!');
        expect(double(3)).toBe(6);
        expect(double(10)).toBe(20);
    });

    test('인수가 없습니다', () => {
        console.log('인수가 없습니다!');
        expect(double()).toBe(0);
    });
});

describe('그룹2', () => {
    beforeAll(() => {
        console.log('beforeAll!!!');
    });
    afterAll(() => {
        console.log('afterAll!!!');
    });

    beforeEach(() => {
        console.log('beforeEach!!!');
    });
    afterEach(() => {
        console.log('afterEach!!!')
    });
    test('첫 테스트', () => {
        console.log('첫 테스트!');
        expect(123).toBe(123);
    });

    test('인수가 숫자 데이터입니다.', () => {
        console.log('인수가 숫자 데이터입니다!');
        expect(double(3)).toBe(6);
        expect(double(10)).toBe(20);
    });

    test('인수가 없습니다', () => {
        console.log('인수가 없습니다!');
        expect(double()).toBe(0);
    });
});

describe('Jest test', () => {
    const userA = {
        name: 'Sungbin',
        age: 26
    }

    const userB = {
        name: 'Neo',
        age: 22
    }

    test('데이터가 일치해야 합니다', () => {
        expect(userA.age).toBe(26);
        expect(userA).toEqual({
            name: 'Sungbin',
            age: 26
        })
    }, 7000);

    test('데이터가 일치하지 않아야 합니다.', () => {
        expect(userB.name).not.toBe('Sungbin');
        expect(userB).not.toEqual(userA);
    }, 7000);
});

describe('비동기 테스트', () => {
    test('done', done => {
        asyncFn().then(res => {
            expect(res).toBe('Done!');
            done();
        });
    }, 7000);

    test('then', () => {
        return asyncFn().then(res => {
            expect(res).toBe('Done!');
        });
    }, 7000);

    test('resolves', () => expect(asyncFn()).resolves.toBe('Done!'), 7000);

    test('async/await', async() => {
        const res = await asyncFn();
        expect(res).toBe('Done!');
    }, 7000);
});