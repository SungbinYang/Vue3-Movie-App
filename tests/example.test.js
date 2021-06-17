import * as example from './example';
import axios from 'axios';
import Example from './Example.vue';
import { mount } from '@vue/test-utils';

// 테스트 그룹
// describe('그룹1', () => {
//     beforeAll(() => {
//         console.log('beforeAll!!!');
//     });
//     afterAll(() => {
//         console.log('afterAll!!!');
//     });

//     beforeEach(() => {
//         console.log('beforeEach!!!');
//     });
//     afterEach(() => {
//         console.log('afterEach!!!')
//     });
//     test('첫 테스트', () => {
//         console.log('첫 테스트!');
//         expect(123).toBe(123);
//     });

//     test('인수가 숫자 데이터입니다.', () => {
//         console.log('인수가 숫자 데이터입니다!');
//         expect(double(3)).toBe(6);
//         expect(double(10)).toBe(20);
//     });

//     test('인수가 없습니다', () => {
//         console.log('인수가 없습니다!');
//         expect(double()).toBe(0);
//     });
// });

// describe('그룹2', () => {
//     beforeAll(() => {
//         console.log('beforeAll!!!');
//     });
//     afterAll(() => {
//         console.log('afterAll!!!');
//     });

//     beforeEach(() => {
//         console.log('beforeEach!!!');
//     });
//     afterEach(() => {
//         console.log('afterEach!!!')
//     });
//     test('첫 테스트', () => {
//         console.log('첫 테스트!');
//         expect(123).toBe(123);
//     });

//     test('인수가 숫자 데이터입니다.', () => {
//         console.log('인수가 숫자 데이터입니다!');
//         expect(double(3)).toBe(6);
//         expect(double(10)).toBe(20);
//     });

//     test('인수가 없습니다', () => {
//         console.log('인수가 없습니다!');
//         expect(double()).toBe(0);
//     });
// });

// describe('Jest test', () => {
//     const userA = {
//         name: 'Sungbin',
//         age: 26
//     }

//     const userB = {
//         name: 'Neo',
//         age: 22
//     }

//     test('데이터가 일치해야 합니다', () => {
//         expect(userA.age).toBe(26);
//         expect(userA).toEqual({
//             name: 'Sungbin',
//             age: 26
//         })
//     }, 7000);

//     test('데이터가 일치하지 않아야 합니다.', () => {
//         expect(userB.name).not.toBe('Sungbin');
//         expect(userB).not.toEqual(userA);
//     }, 7000);
// });

// describe('비동기 테스트', () => {
//     // test('done', done => {
//     //     asyncFn().then(res => {
//     //         expect(res).toBe('Done!');
//     //         done();
//     //     });
//     // }, 7000);

//     // test('then', () => {
//     //     return asyncFn().then(res => {
//     //         expect(res).toBe('Done!');
//     //     });
//     // }, 7000);

//     // test('resolves', () => expect(asyncFn()).resolves.toBe('Done!'), 7000);

//     test('async/await', async() => {
//         jest.spyOn(example, 'asyncFn').mockResolvedValue('Done!');
//         const res = await expample.asyncFn();
//         expect(res).toBe('Done!');
//     }, 7000);
// });

describe('모의함수 테스트', () => {
    test('async/await', async() => {
        jest.spyOn(example, 'asyncFn').mockResolvedValue('Done!')

        const res = await example.asyncFn()
        expect(res).toBe('Done!')
    }, 7000)
})

describe('비동기 테스트', () => {
    test('영화제목 변환', async() => {
        axios.get = jest.fn(() => {
            return new Promise(resolve => {
                resolve({
                    data: {
                        Title: 'Frozen II'
                    }
                })
            })
        })
        const title = await example.fetchMovieTitle();
        expect(title).toBe('Frozen ii')
    })
})

test('메세지를 변경합니다', async() => {
    const wrapper = mount(Example);

    // wrapper.vm === this
    expect(wrapper.vm.msg).toBe('Hello Vue test utils!');
    // wrapper.vm.msg = 'Hello Sungbin!';
    await wrapper.setData({
        msg: 'Hello Sungbin!'
    })
    expect(wrapper.vm.msg).toBe('Hello Sungbin!');
    expect(wrapper.find('div').text()).toBe('Hello Sungbin!');
})