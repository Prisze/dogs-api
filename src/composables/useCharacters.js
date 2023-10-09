/* eslint-disable prettier/prettier */
import { ref } from 'vue'
import useApi from '@/composables/useApi'

const characters = ref([])
const currentCharacter = ref(null)
const firstLoad = ref(true)

const api = useApi()
const page = ref(1)

const useCharacters = () => {
  const fetchCharacters = async () => {
    const { data } = await api.instance.get('/character', {
      params: {
        page: page.value,
      },
    })
console.log(data)
    characters.value.push({
      _id: data.message[0].split("/").slice(4).join("/").replace(/\//g, ','),
      name: data.message[0].split('/')[4].replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      imageUrl: data.message[0]
  })
    page.value++
  }

  const fetchCharacter = async (id) => {
   // Predefined base URL
const baseUrl = "https://images.dog.ceo/breeds/";

// Split 'id' string by the comma
const [namePart, imagePart] = id.split(",");

// Reconstruct the original URL
const imageUrl = `${baseUrl}${id.replace(",", "/")}`;

// Convert name part to Title Case
const name = namePart.split("-").map(word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}).join(" ");

// Assemble the object
const value = {
  data: {
    name: name,
    imageUrl: imageUrl
  }
};

// Assign the value to currentCharacter.value
currentCharacter.value = value;
  }

  return {
    characters,
    fetchCharacters,
    fetchCharacter,
    currentCharacter,
    firstLoad,
  }
}

export default useCharacters
