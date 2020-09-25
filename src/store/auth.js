import axios from "axios"

export default{
    namespaced: true,
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },
    actions: {
        //Metodo antiugo
        // login(context,data){
        //     console.log(context,data);
        //     axios
        //         .post('http://api.dashboard.test/api/login', data)
        //         .then(response => {
        //             console.log(context, data);
        //             console.log(response);
        //         })
        // },
        login({ commit }, user) {
            return new Promise((resolve, reject) => { //Me queda la duda de que xq se hace una promise encima
                commit('auth_request')
                axios({ url: 'http://api.dashboard.test/api/login', data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.access_token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        console.log(token,user);
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },




    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    }
}