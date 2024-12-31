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
            // Compteurs pour chaque type d'élément
            this.counters = {
                lights: 0,
                alarms: 0,
                windows: 0,
                doors: 0
            };
        }
    }

    // Supprimer une salle
    function deleteRoom(position) {
        rooms.delete(parseInt(position));
        updateSidebar();
        updateGrid();
    }

    // Ajouter un élément à une salle
    let placementMode = {
        active: false,
        roomPosition: null,
        elementType: null
    };

    function addElement(position, elementType) {
        placementMode.active = true;
        placementMode.roomPosition = parseInt(position);
        placementMode.elementType = elementType;
        updateGrid(); // Mettre à jour la grille pour montrer le mode placement
    }

    // Supprimer un élément d'une salle
    function deleteElement(position, elementType, elementIndex) {
        const room = rooms.get(parseInt(position));
        if (room) {
            room[elementType].splice(elementIndex, 1);
            // Ne pas renuméroter, garder les positions existantes
            updateSidebar();
            updateGrid();
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
                        <li>Light ${light.number} <button onclick="deleteElement(${room.position}, 'lights', ${index})">Delete</button></li>
                    `).join('')}
                    <li><button onclick="addElement(${room.position}, 'lights')">Add a light</button></li>
                </ul>
                <p><strong>Alarms</strong></p>
                <ul>
                    ${room.alarms.map((alarm, index) => `
                        <li>Alarm ${alarm.number} <button onclick="deleteElement(${room.position}, 'alarms', ${index})">Delete</button></li>
                    `).join('')}
                    <li><button onclick="addElement(${room.position}, 'alarms')">Add an alarm</button></li>
                </ul>
                <p><strong>Windows</strong></p>
                <ul>
                    ${room.windows.map((window, index) => `
                        <li>Window ${window.number} <button onclick="deleteElement(${room.position}, 'windows', ${index})">Delete</button></li>
                    `).join('')}
                    <li><button onclick="addElement(${room.position}, 'windows')">Add a window</button></li>
                </ul>
                <p><strong>Doors</strong></p>
                <ul>
                    ${room.doors.map((door, index) => `
                        <li>Door ${door.number} <button onclick="deleteElement(${room.position}, 'doors', ${index})">Delete</button></li>
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

    function handleCellClick(e, room) {
        if (!placementMode.active || room.position !== placementMode.roomPosition) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        room.counters[placementMode.elementType]++;
        const elementNumber = room.counters[placementMode.elementType];
        
        // Modifier l'état initial selon le type d'élément
        const initialState = (placementMode.elementType === 'lights' || placementMode.elementType === 'alarms') ? 'off' : 'closed';
        
        room[placementMode.elementType].push({
            number: elementNumber,
            x: (x / rect.width) * 100,
            y: (y / rect.height) * 100,
            state: initialState // État initial modifié
        });

        placementMode.active = false;
        updateSidebar();
        updateGrid();
    }

    function toggleElementState(position, elementType, index) {
        const room = rooms.get(parseInt(position));
        if (room && room[elementType][index]) {
            const element = room[elementType][index];
            switch(elementType) {
                case 'lights':
                case 'alarms':
                    element.state = element.state === 'on' ? 'off' : 'on';
                    break;
                case 'doors':
                case 'windows':
                    element.state = element.state === 'open' ? 'closed' : 'open';
                    break;
            }
            updateGrid();
            updateSidebar();
        }
    }

    function createEmptyOrExistingCell(position) {
        const existingRoom = rooms.get(position);
        
        if (existingRoom) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell' + 
                (placementMode.active && placementMode.roomPosition === position ? ' placement-mode' : '');
            
            const content = document.createElement('div');
            content.style.width = '100%';
            content.style.height = '100%';
            content.style.position = 'relative';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = existingRoom.name;
            content.appendChild(nameSpan);
            
            // Ajouter les icônes avec leurs positions spécifiques
            const types = ['lights', 'alarms', 'windows', 'doors'];
            const iconClasses = ['light-icon', 'alarm-icon', 'window-icon', 'door-icon'];
            
            types.forEach((type, index) => {
                existingRoom[type].forEach((element, elementIndex) => {
                    const container = document.createElement('div');
                    container.style.position = 'absolute';
                    container.style.left = `${element.x}%`;
                    container.style.top = `${element.y}%`;
                    container.style.transform = 'translate(-50%, -50%)';

                    const icon = document.createElement('div');
                    icon.className = `${iconClasses[index]} ${element.state}`;
                    icon.textContent = element.number;

                    const toggleBtn = document.createElement('div');
                    toggleBtn.className = 'toggle-btn';
                    
                    // Définir les icônes spécifiques pour chaque type
                    const stateIcons = {
                        'lights': element.state === 'on' ? '💡' : '⭕',
                        'alarms': element.state === 'on' ? '🔔' : '🔕',
                        'windows': element.state === 'open' ? '🪟' : '⬜',
                        'doors': element.state === 'open' ? '🚪' : '🚫'
                    };
                    
                    toggleBtn.innerHTML = stateIcons[type];
                    toggleBtn.onclick = (e) => {
                        e.stopPropagation();
                        toggleElementState(position, type, elementIndex);
                    };

                    icon.appendChild(toggleBtn);
                    container.appendChild(icon);
                    content.appendChild(container);
                });
            });
            
            if (placementMode.active && placementMode.roomPosition === position) {
                cell.onclick = (e) => handleCellClick(e, existingRoom);
                cell.title = 'Click to place element';
            }
            
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
    window.toggleElementState = toggleElementState;

    // Initialiser l'interface
    updateGrid();
});

