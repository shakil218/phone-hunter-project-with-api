const loadPhone = async (searchText ,isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json()
  const phones = data.data
  displayPhones(phones,isShowAll)
}

const displayPhones = (phones,isShowAll) =>{
  const phoneContainer = document.getElementById("phone-container")
  phoneContainer.textContent = ''

  if(phones.length > 12 && !isShowAll){
    document.getElementById('show-all-container').classList.remove('hidden')
  }else{
    document.getElementById('show-all-container').classList.add('hidden')
  }

  if(!isShowAll){
    phones = phones.slice(0,12)
  }
  

  phones.forEach(phone => {
    const phoneCard = document.createElement("div")
    phoneCard.classList = `card bg-base-100 w-auto p-2 shadow-xl`
    phoneCard.innerHTML= `
      <figure class="px-10 pt-10 bg-gray-100">
        <img
          src="${phone.image}"
          alt="Phone"
          class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-accent">Show details</button>
        </div>
      </div>
      `;
      phoneContainer.appendChild(phoneCard)
  });
  toggleLoadingSpinner(false)
  
}

const handleShowDetails = async(id) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phoneFeatures = data.data
  showPhoneDetails(phoneFeatures)
  
}



const showPhoneDetails = (phone) =>{
  const phoneName = document.getElementById('show-details-phone-name')
  phoneName.innerText = phone.name
  const image = document.getElementById('phone-details-image')
  image.innerHTML = `<img src="${phone.image}" alt="" >`
  const showDetailsContainer = document.getElementById('show-details-container')
  showDetailsContainer.innerHTML = `
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at it's layout.</p>
    <p><span class="font-medium">Storage :</span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-medium">Display size :</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-medium">ID :</span>${phone?.slug}</p>
    <p><span class="font-medium">Chipset :</span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-medium">Memory :</span>${phone?.mainFeatures?.memory}</p>
    <p><span class="font-medium">Sensors :</span>${phone?.mainFeatures?.sensors || 'Sensors are not available in this device'}</p>
    <p><span class="font-medium">Bluetooth :</span>${phone?.others?.Bluetooth || 'Bluetooth are not available in this device'}</p>
    <p><span class="font-medium">GPS :</span>${phone?.others?.GPS || "GPS are not available in this device"}</p>
    <p><span class="font-medium">NFC :</span>${phone?.others?.NFC || 'NFC are not available in this device'}</p>
    <p><span class="font-medium">Radio :</span>${phone?.others?.Radio || 'Radio are not available in this device'}</p>
    <p><span class="font-medium">USB :</span>${phone?.others?.USB || "USB are not available in this device"}</p>
    <p><span class="font-medium">WLAN :</span>${phone?.others?.WLAN || "WLAN are not available in this device"}</p>
    <p><span class="font-medium">Brand :</span>${phone?.brand}</p>
    <p><span class="font-medium">Release date :</span>${phone?.releaseDate || 'No data available'}</p>
    
    
  `
  show_details_modal.showModal()

}

const handleSearch = (isShowAll) =>{
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value
  toggleLoadingSpinner(true)
  loadPhone(searchText,isShowAll)
  // searchField.value = ''
}

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-container')
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }else{
    loadingSpinner.classList.add('hidden')
  }
}

const handleShowAll = () =>{
  handleSearch(true)
}
loadPhone()