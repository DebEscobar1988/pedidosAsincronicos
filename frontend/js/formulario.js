
window.onload = async () => {

    let query = new URLSearchParams(location.search)
    const id = query.has('movies') && query.get('movies') /* el método has, te devuelve true o false, si es que se encuentra la clave movie */
    const form = document.querySelector('form')
 

  try {
    const response = await fetch(`http://localhost:3031/api/movies/${id}`);
 console.log(response);
    const {data: {title,rating, awards, release_date, length}} = await response.json();
   

    form.elements[1].value = title
    form.elements[2].value = rating
    form.elements[3].value = awards
    form.elements[4].value = release_date.split('T')[0]
    form.elements[5].value = length
 
  } catch (error) {
    console.log(error);
  }

 form.onsubmit =  function(event){
    event.preventDefault()
   
  }



 try {
  const url = `http://localhost:3031/api/movies/update/${id}`
    const response = await fetch(url,{
      method : 'PUT',
      body:JSON.stringify({
        title: this.elements[1].value,
        rating:this.elements[2].value,
        awards:this.elements[3].value,
        release_date: this.elements[4].value,
        length: this.elements[5].value,
        
      }),
        headers:{
          'Content-Type': 'application/json'}
  
    });
    const result = await response.json();
    console.log(result)
  
  } catch (error) {
    console.log(error);
  }

}