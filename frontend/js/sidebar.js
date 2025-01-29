// This file handles the functionality of the Sidebar, including showing and hiding it on mobile devices.

const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside of it
document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});