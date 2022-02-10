import { Controller } from "@hotwired/stimulus"
import Sortable from "sortablejs";

export default class extends Controller {
  static targets = ["results", "input"]

  connect() {
    console.log("movies controller connected")
    this.fetchMovies("harry potter") // on 1st page load

    Sortable.create(this.resultsTarget, {
        ghostClass: "ghost",
        animation: 150,
        onEnd: (event) => {
          alert(`${event.oldIndex} moved to ${event.newIndex}`)
        }
      })

  }

  search(event) {
    event.preventDefault()
    this.resultsTarget.innerHTML = ""
    this.fetchMovies(this.inputTarget.value)
  }

  fetchMovies(query) {
    fetch(`http://www.omdbapi.com/?s=${query}&apikey=adf1f2d7`)
      .then(response => response.json())
      .then(data => this.insertMovies(data))
  }

  insertMovies(data) {
    data.Search.forEach((result) => {
      const movieTag = `<li class="list-group-item border-0">
        <img src="${result.Poster}" alt="" width="100">
      </li>`
      this.resultsTarget.insertAdjacentHTML("beforeend", movieTag)
    })
  }



  

}


