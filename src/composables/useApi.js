/* eslint-disable prettier/prettier */
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://dog.ceo/api/breed/hound/afghan/images/random',
})

const useApi = () => {
  return { instance }
}

export default useApi
