export async function fetchTrending() {
  const response = await fetch("https://dummyjson.com/products/");
  const data = await response.json();

  //   if (data){
//   setTimeout(() => {
    
    return data;
//   }, 3000);
  //   }
}
