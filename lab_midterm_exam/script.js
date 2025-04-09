document.addEventListener('DOMContentLoaded', () => {
    const previousTasksItem = document.getElementById('previousTasks');
    const megaMenu = document.getElementById('megaMenu');
  
    // Toggle the Mega Menu
    previousTasksItem.addEventListener('click', (e) => {
      e.stopPropagation();
      megaMenu.classList.toggle('show');
    });
  
    // Close the Mega Menu when clicking outside
    document.addEventListener('click', (event) => {
      // If the menu is open and the click is not inside the menu, close it
      if (megaMenu.classList.contains('show') && !megaMenu.contains(event.target)) {
        megaMenu.classList.remove('show');
      }
    });
  
    // Stop clicks in the megaMenu from bubbling up (optional, if you want to allow internal clicks)
    megaMenu.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });
  