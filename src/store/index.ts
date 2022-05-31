import { createStore } from 'vuex'

const store = createStore({
  state: () => {
    return {
      x: 'lala'
    }
  }
})

export default store
