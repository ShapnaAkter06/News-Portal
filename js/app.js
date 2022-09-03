const loadAllCatagories = async () => {
    try {
        const url = ("https://openapi.programming-hero.com/api/news/categories")
        const response = await fetch(url);
        const data = await response.json();
        displayAllCatagories(data.data.news_category);
    } catch (e) {
        console.log(e)
    }   
}
const displayAllCatagories = (catagories) =>{
    const allCatagories = document.getElementById('all-catagory');
    catagories.forEach(catagory => {
        console.log(catagory)
        const catagoryDiv = document.createElement('div');
        catagoryDiv.classList.add('catagory')
        catagoryDiv.innerHTML =`
        <div onclick="loadCatagoriesDetails('${catagory.category_id}')">
        <a>${catagory.category_name}</a>
        </div>
        `
        allCatagories.appendChild(catagoryDiv)
    });
}
const loadCatagoriesDetails = async(catagoryId) => {
   try {
    const url = (`https://openapi.programming-hero.com/api/news/category/${catagoryId}`)
    const response = await fetch(url);
    const data = await response.json();
    displayCatagoriesDetails(data.data)
   } catch (e) {
    console.log(e)
   }
}
const displayCatagoriesDetails = (catagoriesNews) => {
    document.getElementById('spinner').classList.remove('d-none')
    const x = [];
    x.push(catagoriesNews);
    const catagoryLength = document.getElementById('catagory-length').innerText = `${x[0].length} items found for catagory entertainment`;
    
    const catagoryDetailsContainer = document.getElementById('catagory-details-container');
    catagoryDetailsContainer.textContent = '';
    catagoriesNews.forEach(catagory => {
       
        const catagoryDetailsDiv = document.createElement('div');
        catagoryDetailsDiv.classList.add('card');
        catagoryDetailsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${catagory.thumbnail_url}" class="card-img-top" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${catagory.title}</h5>
                <p class="card-text">${catagory.details.slice(0, 300) + '...'}</p>
                    <div class="row row-cols-1 row-cols-md-4 g-4">
                        <div class="col">
                        <img src="${catagory.author.img}" class="card-img-top" style = "width:50px" alt="...">
                        <h6 class="card-title">${catagory.author.name? catagory.author.name : "No name found"}</h6>
                        <p class="small">${catagory.author.published_date}</p>
                        </div>
                        <div class="col">
                            <i class="fa-solid fa-eye"></i>
                            <span>${catagory.total_view}</span>
                        </div>
                        <div class="col">
                        <i class="fa-regular fa-star"></i> 
                        <i class="fa-regular fa-star"></i> 
                        <i class="fa-regular fa-star"></i> 
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <div class="col">
                        <button onclick="loadNewsModal('${catagory._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
                        <i class="fa-solid fa-arrow-right">
                        </i>  
                        </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        `
        catagoryDetailsContainer.appendChild(catagoryDetailsDiv)
    })
    document.getElementById('spinner').classList.add('d-none')
}
const loadNewsModal = async (id) => {
    const url = (`https://openapi.programming-hero.com/api/news/${id}`)
    const response = await fetch(url);
    const data = await response.json();
    displayModalNews(data.data[0])
    
}
const displayModalNews = (news) =>{
    const modalTitle = document.getElementById('newsDetailsModalLabel');
    modalTitle.innerText = `${news.author.name? news.author.name : "No data available"}`;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
        <img src="${news.author.img}" class="card-img-top" style = "width:100%" alt="No data available">
        <p> Publish Date : ${news.author.published_date? news.author.published_date : "No data available"}</P>
        <p> Total View : ${news.total_view? news.total_view : "No data available"}</P>
    `
}
loadAllCatagories()