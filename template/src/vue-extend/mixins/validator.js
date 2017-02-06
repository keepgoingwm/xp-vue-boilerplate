export default {
  methods: {
    isValidChinaName (name) {
      return !!name && (name.length >= 2)
    },
    isValidMobilePhone (phoneNumber) {
      return /^1\d{10}$/.test(phoneNumber)
    },
    isValidTelephone (telephoneNumber) {
      return /^\d*-?\d*$/.test(telephoneNumber)
    },
    isValidAuthCode (authCode, maxLength) {
      maxLength = maxLength || 6
      var regExp = new RegExp(`^\\d{4,${maxLength}}$`)
      return regExp.test(authCode)
    }
  }
}
