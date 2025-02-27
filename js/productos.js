document.addEventListener("DOMContentLoaded", function() {

    const checkboxes = document.querySelectorAll(".filter-checkbox");
    const cards = document.querySelectorAll(".card-container");
  
    function filterCards() {
      const selectedCategories = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
  
      cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (selectedCategories.length === 0 || selectedCategories.includes(cardCategory)) {
          card.style.display = "block"; // Mostrar si coincide con una categoría seleccionada o si ninguna está seleccionada
        } else {
          card.style.display = "none"; // Ocultar si no está en la lista de seleccionados
        }
      });
    }
  
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", filterCards);
    });
  
    filterCards(); // Mostrar todas las tarjetas al inicio
      
    // TARJETAS Y MODAL DE PIEDRAS
    document.querySelectorAll('.flip-card-btn').forEach(button => {
        button.addEventListener('click', function () {
            const images = this.getAttribute('data-image').split(',');

            // Actualizar la información de la modal
            document.getElementById('modalProductTitle').textContent = this.getAttribute('data-title');
            document.getElementById('modalProductDetails').textContent = this.getAttribute('data-details');
            document.getElementById('modalProductMeasurements').textContent = this.getAttribute('data-measurements');
            document.getElementById('modalProductColors').textContent = this.getAttribute('data-colors');
            
            // Crear las imágenes del carousel
            const carouselInner = document.getElementById('carouselImages');
            carouselInner.innerHTML = ''; // Limpiar las imágenes previas
        
            images.forEach((image, index) => {
                const activeClass = index === 0 ? 'active' : ''; // La primera imagen estará activa
                const carouselItem = `
                <div class="carousel-item ${activeClass}">
                    <img src="${image}" class="d-block" alt="Piedras" style="width: 100%; height: 100%;">
                </div>
                `;
                carouselInner.innerHTML += carouselItem; // Agregar la imagen al carousel
            });
        
            // Desaparecer la tarjeta actual, (efecto de levantar la tarjeta)
            const card = this.closest('.card'); // Obtener la tarjeta actual
            card.classList.add('hide'); // Agregar la clase 'hide' para desaparecer la tarjeta
        
            // Mostrar la modal con un efecto de vuelta, después de un ligero retraso
            setTimeout(() => {
                const modal = new bootstrap.Modal(document.getElementById('infoModal'));
                modal.show();
        
                // Restablecer la tarjeta cuando la modal se cierra
                const modalElement = document.getElementById('infoModal');
                modalElement.addEventListener('hidden.bs.modal', () => {
                card.classList.remove('hide'); // Eliminar la clase 'hide' para hacer que la tarjeta vuelva a aparecer
                });
            }, 100); // Trabaja con el estilo de la clase modal-flip
        });
    });

    // TARJETAS Y MODAL DE HERRAMIENTAS
    document.querySelectorAll('.flip-card-tools-btn').forEach(button => {
        button.addEventListener('click', function () {
            document.getElementById('modalToolImage').src = this.getAttribute('data-image');
            document.getElementById('modalToolTitle').textContent = this.getAttribute('data-title');
            document.getElementById('modalToolDetails').textContent = this.getAttribute('data-details');
            document.getElementById('modalToolAttribute1').textContent = this.getAttribute('attribute1');
            document.getElementById('modalToolAttribute2').textContent = this.getAttribute('attribute2');
            document.getElementById('modalToolAttribute3').textContent = this.getAttribute('attribute3');
            document.getElementById('modalToolAttribute4').textContent = this.getAttribute('attribute4');
            document.getElementById('modalToolAttribute5').textContent = this.getAttribute('attribute5');
            document.getElementById('modalToolAttribute6').textContent = this.getAttribute('attribute6');
            document.getElementById('modalToolAttribute7').textContent = this.getAttribute('attribute7');
            
            // Desaparecer la tarjeta actual, (efecto de levantar la tarjeta)
            const card = this.closest('.card'); // Obtener la tarjeta actual
            card.classList.add('hide'); // Agregar la clase 'hide' para desaparecer la tarjeta
        
            // Mostrar la modal con un efecto de vuelta, después de un ligero retraso
            setTimeout(() => {
                const modal = new bootstrap.Modal(document.getElementById('infoToolModal'));
                modal.show();
        
                // Restablecer la tarjeta cuando la modal se cierra
                const modalElement = document.getElementById('infoToolModal');
                modalElement.addEventListener('hidden.bs.modal', () => {
                card.classList.remove('hide'); // Eliminar la clase 'hide' para hacer que la tarjeta vuelva a aparecer
                });
            }, 100); // Trabaja con el estilo de la clase modal-flip
        });
    });


    // FOOTER
    const fecha = new Date();
    var footer = "Copyright © " + fecha.getFullYear() + " Grupo Orfebreros, S.A. All Rights Reserved.";
    document.getElementById("DevuelveTextoFooterConAnio").innerHTML = footer;

    // FORMSUBMIT REDIRECT URL
    fetch('config.json')
    .then(response => response.json())
    .then(data => {
    document.getElementById('_next').value = data.prodUrl + 'productos.html#secContacto';
    })
    .catch(error => console.error('Error al cargar archivo JSON:', error));
});