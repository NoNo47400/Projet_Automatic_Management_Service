document.addEventListener('DOMContentLoaded', () => {
    // Structure de données pour stocker l'état des salles
    let rooms = new Map();

    // Classe pour représenter une salle
    class Room {
        constructor(position) {
            this.name = `Room ${position + 1}`; // Le nom est basé sur la position
            this.position = position;
            this.lights = [];
            this.alarms = [];
            this.windows = [];
            this.doors = [];
        }
    }

    // Supprimer une salle
    function deleteRoom(position) {
        rooms.delete(parseInt(position));
        updateSidebar();
        updateGrid();
    }

    // Ajouter un élément à une salle
    function addElement(position, elementType) {
        const room = rooms.get(parseInt(position));
        if (room) {
            const elementNumber = room[elementType].length + 1;
            room[elementType].push(`${elementType.slice(0, -1)} ${elementNumber}`);
            updateSidebar();
            updateGrid();  // Ajout de cette ligne
        }
    }

    // Supprimer un élément d'une salle
    function deleteElement(position, elementType, elementIndex) {
        const room = rooms.get(parseInt(position));
        if (room) {
            room[elementType].splice(elementIndex, 1);
            // Renuméroter les éléments restants
            room[elementType] = room[elementType].map((element, index) => 
                `${elementType.slice(0, -1)} ${index + 1}`
            );
            updateSidebar();
            updateGrid();  // Ajout de cette ligne pour mettre à jour la grille
        }
    }

    // Mettre à jour la barre latérale
    function updateSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.innerHTML = '';

        // Trier les salles par position pour affichage cohérent
        const sortedRooms = Array.from(rooms.values()).sort((a, b) => a.position - b.position);

        sortedRooms.forEach((room) => {
            const roomDiv = document.createElement('div');
            roomDiv.className = 'room';
            roomDiv.innerHTML = `
                <h3>${room.name} <button onclick="deleteRoom(${room.position})">Delete</button></h3>
                <p><strong>Lights</strong></p>
                <ul>
                    ${room.lights.map((light, index) => `
                        <li>${light} <button onclick="deleteElement(${room.position}, 'lights', ${index})">Delete</button></li>
                    `).join('')}
                    <li><button onclick="addElement(${room.position}, 'lights')">Add a light</button></li>
                </ul>
                <p><strong>Alarms</strong></p>
                <ul>
                    ${room.alarms.map((alarm, index) => `
                        <li>${alarm} <button onclick="deleteElement(${room.position}, 'alarms', ${index})">Delete</button></li>
                    `).join('')}
                    <li><button onclick="addElement(${room.position}, 'alarms')">Add an alarm</button></li>
                </ul>
                <p><strong>Windows</strong></p>
                <ul>
                    ${room.windows.map((window, index) => `
                        <li>${window} <button onclick="deleteElement(${room.position}, 'windows', ${index})">Delete</button></li>
                    `).join('')}
                    <li><button onclick="addElement(${room.position}, 'windows')">Add a window</button></li>
                </ul>
                <p><strong>Doors</strong></p>
                <ul>
                    ${room.doors.map((door, index) => `
                        <li>${door} <button onclick="deleteElement(${room.position}, 'doors', ${index})">Delete</button></li>
                    `).join('')}
                    <li><button onclick="addElement(${room.position}, 'doors')">Add a door</button></li>
                </ul>
            `;
            sidebar.appendChild(roomDiv);
        });
    }

    // Mettre à jour la grille
    function updateGrid() {
        const main = document.querySelector('.main');
        main.innerHTML = '';

        // Créer la première rangée de 6 cellules
        for (let i = 0; i < 6; i++) {
            const cell = createEmptyOrExistingCell(i);
            main.appendChild(cell);
        }

        // Ajouter le couloir
        const corridor = document.createElement('div');
        corridor.className = 'corridor';
        corridor.textContent = 'Corridor';
        main.appendChild(corridor);

        // Créer la deuxième rangée de 6 cellules
        for (let i = 6; i < 12; i++) {
            const cell = createEmptyOrExistingCell(i);
            main.appendChild(cell);
        }
    }

    function createEmptyOrExistingCell(position) {
        const existingRoom = rooms.get(position);
        
        if (existingRoom) {
            // Créer une cellule avec la salle existante
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            
            const content = document.createElement('div');
            content.style.width = '100%';
            content.style.height = '100%';
            content.style.position = 'relative';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = existingRoom.name;
            content.appendChild(nameSpan);
            
            // Ajouter les conteneurs d'icônes
            const iconsContainer = document.createElement('div');
            iconsContainer.className = 'icons-container';
            
            // Ajout des différentes lignes d'icônes
            const types = ['lights', 'alarms', 'windows', 'doors'];
            const iconClasses = ['light-icon', 'alarm-icon', 'window-icon', 'door-icon'];
            
            types.forEach((type, index) => {
                const row = document.createElement('div');
                row.className = 'icon-row';
                existingRoom[type].forEach(() => {
                    const icon = document.createElement('div');
                    icon.className = iconClasses[index];
                    row.appendChild(icon);
                });
                iconsContainer.appendChild(row);
            });
            
            content.appendChild(iconsContainer);
            cell.appendChild(content);
            return cell;
        } else {
            // Créer une cellule vide
            const cell = document.createElement('div');
            cell.className = 'grid-cell empty-cell';
            cell.textContent = 'Add Room';
            cell.onclick = () => {
                const room = new Room(position);
                rooms.set(position, room);
                updateSidebar();
                updateGrid();
            };
            return cell;
        }
    }

    // Rendre les fonctions globales
    window.deleteRoom = deleteRoom;
    window.addElement = addElement;
    window.deleteElement = deleteElement;

    // Initialiser l'interface
    updateGrid();
});

