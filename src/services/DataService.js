class DataService {
    async fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      return data;
    }
  }
  
  export default new DataService();
  