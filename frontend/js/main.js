window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
  try {
    const response = await fetch("http://localhost:3031/api/movies");
    const result = await response.json();

    let data = result.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      const link = document.createElement("a");
      link.setAttribute("href", `formulario.html?movies=${movie.id}&edit=true`);
      link.textContent = "EDITAR";
      link.setAttribute("class", "botonEditar")
      card.appendChild(link);

      //Estrella de favoritos:
      const star = document.createElement("a");
      star.setAttribute("class", "botonAgregarStart");
      star.innerHTML = '<i class="fa-regular fa-star fa-beat" style="color: #f6fa00;"></i>';
      card.appendChild(star);

      star.addEventListener("click", function () {
        // Obtener las películas favoritas de sessionStorage

        const peliculasFavoritasSession =
          JSON.parse(sessionStorage.getItem("peliculasFavoritas")) || [];

        if (!peliculasFavoritasSession.includes(movie)) {
          // Agregar la película a la lista de favoritos

          peliculasFavoritasSession.push(movie);
        }

        // Guardar las películas favoritas actualizadas en sessionStorage
        sessionStorage.setItem(
          "peliculasFavoritas",
          JSON.stringify(peliculasFavoritasSession)
        );

        // Imprimir la lista de películas favoritas
        console.log(peliculasFavoritasSession);
      });
    });

  } catch (error) {
    console.log(error);
  }
};
