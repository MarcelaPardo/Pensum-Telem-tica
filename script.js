document.addEventListener('DOMContentLoaded', function() {
  // Inicializar Mermaid
  mermaid.initialize({ 
    startOnLoad: true,
    theme: 'default',
    flowchart: { useMaxWidth: true }
  });

  // Función para tachar materias al hacer doble clic
  document.querySelectorAll('.mermaid .node').forEach(node => {
    node.addEventListener('dblclick', function() {
      this.classList.toggle('completed');
      // Guardar en localStorage
      const courseId = this.querySelector('text').textContent.split('\n')[0];
      const completed = localStorage.getItem(courseId) === 'true';
      localStorage.setItem(courseId, !completed);
    });

    // Cargar estado guardado
    const courseId = node.querySelector('text').textContent.split('\n')[0];
    if (localStorage.getItem(courseId) === 'true') {
      node.classList.add('completed');
    }
  });

  // Mostrar detalles al hacer clic
  document.querySelectorAll('.mermaid .node').forEach(node => {
    node.addEventListener('click', function(e) {
      if (e.detail === 1) { // Evitar conflicto con doble clic
        const text = this.querySelector('text').textContent;
        const [name, hours] = text.split('\n');
        alert(`📚 ${name}\n⏱️ ${hours || 'Sin detalles'}`);
      }
    });
  });
});