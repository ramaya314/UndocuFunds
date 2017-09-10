import flux from '../helpers/flux-dispatcher'

export default {
  setUser (id) {
    flux.dispatch('setUser', id)
  }
}
