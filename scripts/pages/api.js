export async function getPhotographers() {
    let photographers = [];
  
    await fetch('data/photographers.json')
      .then((response) => response.json())
      .then((data) => {
        photographers = data.photographers;
      });
  
    return ({ photographers: [...photographers] });
  }