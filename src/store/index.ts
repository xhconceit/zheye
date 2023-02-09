import { createStore, useStore as _useStore } from "vuex";
import { testData, testPosts } from '../testData'
import axios from "axios";


export interface ResponseType<T = {}> {
  code: number
  msg: string
  data: T
}

export interface ImageProps {
  _id?: string,
  url?: string,
  fitUrl?: string,
  createdAt?: string,
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  // _id?: string;
  // title: string;
  // excerpt?: string;
  // content?: string;
  // image?: ImageProps;
  // createdAt: string;
  // column: string;
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}
export interface UserProps {

  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
  avatar? :string | ImageProps
  description?: string
}

export interface GlobalErrorProps {
  status: boolean
  message?: string
}


export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  loading: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}


const store = createStore<GlobalDataProps>({
  state: {
    error: {
      status: false, message: ''
    },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: false
    }

  },
  mutations: {
    // login(state) {
    //   state.user = { ...state.user, isLogin: true, name: 'viking', columnId: 1 }
    // },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    }, fetchPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading(state, status) {
      state.loading = status
    },
    login(state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    logout(state) {
      state.user = {isLogin: false}
      state.posts = []
      state.columns = []
      localStorage.removeItem('token')
      state.token = ''
      delete axios.defaults.headers.common.Authorization
    },
    fetchPost(state, rawData) {
      // state.posts.data[rawData.data._id] = rawData.data
      state.posts = [rawData.data]
    }
  },
  actions: {
    fetchColumns(context) {
      axios.get('/columns').then(resp => {
        context.commit("fetchColumns", resp.data)
      })
    },
    fetchColumn({ commit }, cid) {
      return axios.get(`/columns/${cid}`).then(resp => {
        commit('fetchColumn', resp.data)
        return resp.data
      })
    },
    fetchPosts({ commit }, cid) {
      return axios.get(`/columns/${cid}/posts`).then(resp => {
        commit('fetchPosts', resp.data)
        return resp.data
      })
    },
    login({ commit }, payload) {
      return axios.post('/user/login', payload).then(resp => {
        commit('login', resp.data)
        return resp.data
      })
    },
    fetchCurrentUser({ commit, }) {
      return axios.get(`/user/current`).then(resp => {
        commit('fetchCurrentUser', resp.data)
        return resp.data
      })

      // .catch(e => {
      //   console.log(e)
      // })
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    createPost({ commit }, payload) {
      return axios.post('/posts', payload).then(resp => {
        commit('createPost', resp.data)
        return resp.data
      })
    },
    fetchPost({ commit }, postId) {
      return axios.get('/posts/' + postId).then(resp => {
        commit('fetchPost', resp.data)
        return resp.data
      })
    }
  },
  getters: {
    getColumnById(state) {
      return (id: string) => {
        return state.columns.find(c => c._id === id)
      }
    },
    getPostsById: (state) => (id: string) => {
      return state.posts.filter(post => post.column === id)
    },
    getPostById: (state) => {
      return (id: string) => {
        return state.posts.find(p => p._id === id)
      }
    }
  }
})

export function useStore() {
  return _useStore<GlobalDataProps>()
}


export default store
