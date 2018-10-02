import axios from 'axios'

export const clientApi = async (method, url, params) => {
  try {
    const request = await axios[method](url, params)
    return request
  } catch(err) {
    console.log(err)
  }
}
