import axios from "axios";
import _uniqBy from 'lodash/uniqBy';

const _defaultMessage = 'Search for the movie title!';

export default {
    // module화
    namespaced: true,
    // data
    state: () => ({
        movies: [],
        message: _defaultMessage,
        loading: false,
        theMovie: {}
    }),
    // computed와 비슷한 계산된 데이터 :: 데이터를 가져와 활용함
    getters: {},
    // methods
    // 변이
    // 여기서만 데이터를 변경할수 있다. :: 활용 + 수정
    mutations: {
        updateState(state, payload) {
            Object.keys(payload).forEach(key => {
                state[key] = payload[key];
            });
        },
        resetMovies(state) {
            state.movies = [];
            state.message = _defaultMessage;
            state.loading = false;
        }
    },
    // 비동기로 동작함, 메소드
    actions: {
        async searchMovies({ commit, state }, payload) {
            if (state.loading) return;

            commit('updateState', {
                message: '',
                loading: true
            });

            try {
                const res = await _fetchMovie({
                    ...payload,
                    page: 1
                });
                const { Search, totalResults } = res.data;
                commit('updateState', {
                    movies: _uniqBy(Search, 'imdbID')
                });
                console.log(totalResults); // 266
                console.log(typeof totalResults); // string

                const total = parseInt(totalResults, 10);
                const pageLength = Math.ceil(total / 10);

                // 추가 요청!
                if (pageLength > 1) {
                    for (let page = 2; page <= pageLength; page++) {
                        if (page > (payload.number / 10)) break;
                        const res = await _fetchMovie({
                            ...payload,
                            page
                        });
                        const { Search } = res.data;
                        commit('updateState', {
                            movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
                        });
                    }
                }
            } catch ({ message }) {
                commit('updateState', {
                    movies: [],
                    message
                });
            } finally {
                commit('updateState', {
                    loading: false
                });
            }
        },
        async searchMovieWithId({ state, commit }, payload) {
            if (state.loading) return;

            commit('updateState', {
                theMovie: {},
                loading: true
            });

            try {
                const res = await _fetchMovie(payload);
                console.log(res.data);
                commit('updateState', {
                    theMovie: res.data
                });
            } catch (error) {
                commit('updateState', {
                    theMovie: {}
                });
            } finally {
                commit('updateState', {
                    loading: false
                });
            }
        }
    }
}

async function _fetchMovie(payload) {
    return await axios.post('/.netlify/functions/movie', payload);
}