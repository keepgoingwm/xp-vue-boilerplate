export default {
  methods: {
    getNumber (obj, key) {
      if (!obj) {
        return 0
      } else {
        return obj[key] || 0
      }
    }
  }
}
