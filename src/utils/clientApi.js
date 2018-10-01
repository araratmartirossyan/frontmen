import axios from 'axios'

export const clientApi = async (method, url) => {
  try {
    const request = await axios[method](url)
    return request
  } catch(err) {
    throw new Error(err)
  }
}
