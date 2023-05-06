import BaseAPI from '@/config/axios'
class AccountService {
  signIn(payload) {
    BaseAPI.post('/accounts/', payload)
      .then((res) => {
        if (res.data) {
          const response = res.data
          if (response.role == 'Quản trị viên') {
            localStorage.setItem('user', JSON.stringify(response.username))
            window.location.href = '/adminstrator'
          } else {
            window.location.href = '/home'
          }
        }
      })
      .catch((err) => console.log(err))
  }
}

export default new AccountService()
