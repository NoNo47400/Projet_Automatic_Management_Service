document.addEventListener('DOMContentLoaded', async () => {
    // Structure de données pour stocker l'état des salles
    let rooms = new Map();

    // Ajouter au début du fichier
    
    const ROOM_API_URL = 'http://localhost:8081/rooms';
    const DOORS_API_URL = 'http://localhost:8082/doors';
    const ALARMS_API_URL = 'http://localhost:8083/alarms';
    const LIGHTS_API_URL = 'http://localhost:8084/lights';
    const SENSORS_API_URL = 'http://localhost:8085/sensors';
    const WINDOWS_API_URL = 'http://localhost:8086/windows';
    const USERS_API_URL = 'http://localhost:8088/users';
    const RESET_API_URL = 'http://localhost:5000/reset';

    async function createWindowInDB(windowData) {
        try {
            const response = await fetch(WINDOWS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(windowData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating window:', error);
        }
    }

    async function deleteWindowFromDB(id) {
        try {
            await fetch(`${WINDOWS_API_URL}/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error deleting window:', error);
        }
    }

    async function updateWindowState(id, closed) {
        try {
            const response = await fetch(`${WINDOWS_API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ closed: closed })
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating window:', error);
        }
    }

    // Ajouter les fonctions pour l'API Room
    async function createRoomInDB(roomData) {
        try {
            const response = await fetch(ROOM_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating room:', error);
        }
    }

    async function deleteRoomFromDB(id) {
        try {
            await fetch(`${ROOM_API_URL}/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    }

    // Ajouter les fonctions pour les nouveaux services
    async function createDoorInDB(doorData) {
        try {
            const response = await fetch(DOORS_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doorData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating door:', error);
        }
    }

    async function deleteDoorFromDB(id) {
        try {
            await fetch(`${DOORS_API_URL}/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error deleting door:', error);
        }
    }

    async function updateDoorState(id, closed) {
        try {
            const response = await fetch(`${DOORS_API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ closed: closed })
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating door:', error);
        }
    }

    async function createLightInDB(lightData) {
        try {
            const response = await fetch(LIGHTS_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lightData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating light:', error);
        }
    }

    async function deleteLightFromDB(id) {
        try {
            await fetch(`${LIGHTS_API_URL}/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error deleting light:', error);
        }
    }

    async function updateLightState(id, active) {
        try {
            const response = await fetch(`${LIGHTS_API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ active: active })
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating light:', error);
        }
    }

    async function createSensorInDB(sensorData) {
        try {
            const response = await fetch(SENSORS_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sensorData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating sensor:', error);
        }
    }

    async function deleteSensorFromDB(id) {
        try {
            await fetch(`${SENSORS_API_URL}/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error deleting sensor:', error);
        }
    }

    async function createUserInDB(userData) {
        try {
            const response = await fetch(USERS_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

    async function deleteUserFromDB(id) {
        try {
            await fetch(`${USERS_API_URL}/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    async function createAlarmInDB(alarmData) {
        try {
            const response = await fetch(ALARMS_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(alarmData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating alarm:', error);
        }
    }

    async function deleteAlarmFromDB(id) {
        try {
            await fetch(`${ALARMS_API_URL}/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error deleting alarm:', error);
        }
    }

    async function updateAlarmState(id, active) {
        try {
            const response = await fetch(`${ALARMS_API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ active: active })
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating alarm:', error);
        }
    }

    // Fonction pour réinitialiser la base de données
    async function resetDatabase() {
        try {
            const response = await fetch(RESET_API_URL, {
                method: 'POST',
            });
            const result = await response.json();
            if (result.status === 'success') {
                console.log('Database reset successfully');
            } else {
                console.error('Error resetting database:', result.message);
            }
        } catch (error) {
            console.error('Error calling reset API:', error);
        }
    }

    // Réinitialiser la base de données au chargement de la page
    await resetDatabase();

    // Classe pour représenter une salle
    class Room {
        constructor(position) {
            this.name = `Room ${position + 1}`; // Le nom est basé sur la position
            this.position = position;
            this.lights = [];
            this.alarms = [];
            this.windows = [];
            this.doors = [];
            this.sensors = [];
            this.users = [];
            // Compteurs pour chaque type d'élément
            this.counters = {
                lights: 0,
                alarms: 0,
                windows: 0,
                doors: 0,
                users: 0,
                sensors: 0
            };
        }
    }

    // Supprimer une salle
    function deleteRoom(position) {
        const room = rooms.get(parseInt(position));
        if (room && room.dbId) {
            deleteRoomFromDB(room.dbId);
        }
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
            const element = room[elementType][elementIndex];
            switch(placementMode.elementType) {
                case 'windows':
                    deleteWindowFromDB(element.dbId);
                    break;
                case 'doors':
                    deleteDoorFromDB(element.dbId);
                    break;
                case 'lights':
                    deleteLightFromDB(element.dbId);
                    break;
                case 'sensors':
                    deleteSensorFromDB(element.dbId);
                    break;
                case 'users':
                    deleteUserFromDB(element.dbId);
                    break;
                case 'alarms':
                    deleteAlarmFromDB(element.dbId);
                    break;
            }
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
                <p><strong>Sensors</strong></p>
                <ul>
                    ${room.sensors.map((sensor, index) => `
                        <li>Sensor ${sensor.number} <button onclick="deleteElement(${room.position}, 'sensors', ${index})">Delete</button></li>
                    `).join('')}
                    <li><button onclick="addElement(${room.position}, 'sensors')">Add a sensor</button></li>
                </ul>
                <p><strong>Users</strong></p>
                <ul>
                    ${room.users.map((user, index) => `
                        <li>User ${user.number} <button onclick="deleteElement(${room.position}, 'users', ${index})">Delete</button></li>
                    `).join('')}
                    <li><button onclick="addElement(${room.position}, 'users')">Add a user</button></li>
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
        
        const initialState = (placementMode.elementType === 'lights' || placementMode.elementType === 'alarms' || placementMode.elementType === "sensors") ? false : true; // Les portes et fenêtres sont initialement fermées tandis que les autres sont inactifs

        const element = {
            number: elementNumber,
            x: (x / rect.width) * 100,
            y: (y / rect.height) * 100,
            state: initialState
        };

        // Créer l'élément dans la DB selon son type
        switch(placementMode.elementType) {
            case 'windows':
                createWindowInDB({
                    windowName: `R${room.position + 1}_W${elementNumber}`,
                    roomId: room.position + 1,
                    closed: true
                }).then(handleDBResponse);
                break;
            case 'doors':
                createDoorInDB({
                    doorName: `R${room.position + 1}_D${elementNumber}`,
                    roomId: room.position + 1,
                    closed: true
                }).then(handleDBResponse);
                break;
            case 'lights':
                createLightInDB({
                    lightName: `R${room.position + 1}_L${elementNumber}`,
                    roomId: room.position + 1,
                    active: false
                }).then(handleDBResponse);
                break;
            case 'sensors':
                createSensorInDB({
                    sensorName: `R${room.position + 1}_S${elementNumber}`,
                    roomId: room.position + 1,
                    active: false
                }).then(handleDBResponse);
                break;
            case 'users':
                createUserInDB({
                    userName: `R${room.position + 1}_U${elementNumber}`,
                    roomId: room.position + 1,
                }).then(handleDBResponse);
                break;
            case 'alarms':
                createAlarmInDB({
                    alarmName: `R${room.position + 1}_A${elementNumber}`,
                    roomId: room.position + 1,
                    active: false
                }).then(handleDBResponse);
                break;
        }

        function handleDBResponse(data) {
            if (data) {
                element.dbId = data.id;
                element.fullName = data[placementMode.elementType.slice(0, -1) + 'Name'];
                room[placementMode.elementType].push(element);
            }
            placementMode.active = false;
            updateSidebar();
            updateGrid();
        }
    }

    function toggleElementState(position, elementType, index) {
        const room = rooms.get(parseInt(position));
        if (room && room[elementType][index]) {
            const element = room[elementType][index];
            switch(elementType) {
                case 'lights':
                    element.state = element.state === true ? false : true;
                    if (element.dbId) {
                        updateLightState(element.dbId, element.state);
                    }
                    break;
                case 'alarms':
                    element.state = element.state === true ? false : true;
                    if (element.dbId) {
                        updateAlarmState(element.dbId, element.state);
                    }
                    break;
                case 'doors':
                    element.state = element.state === true ? false : true;
                    if (element.dbId) {
                        updateDoorState(element.dbId, element.state);
                    }
                    break;
                case 'windows':
                    element.state = element.state === true ? false : true;
                    if (element.dbId) {
                        updateWindowState(element.dbId, element.state);
                    }
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
            const types = ['lights', 'alarms', 'windows', 'doors', 'sensors', 'users'];
            const iconClasses = ['light-icon', 'alarm-icon', 'window-icon', 'door-icon', 'sensor-icon', 'user-icon'];
            
            types.forEach((type, index) => {
                existingRoom[type].forEach((element, elementIndex) => {
                    const container = document.createElement('div');
                    container.style.position = 'absolute';
                    container.style.left = `${element.x}%`;
                    container.style.top = `${element.y}%`;
                    container.style.transform = 'translate(-50%, -50%)';

                    const icon = document.createElement('div');
                    // Modification ici pour la gestion des classes CSS
                    const stateClass = getStateClass(type, element.state);
                    icon.className = `${iconClasses[index]} ${stateClass}`;
                    icon.textContent = element.number;

                    const toggleBtn = document.createElement('div');
                    toggleBtn.className = 'toggle-btn';
                    
                    // Définir les icônes spécifiques pour chaque type
                    const stateIcons = {
                        'lights': element.state === true ? '💡' : '⭕',
                        'alarms': element.state === true ? '🔔' : '🔕',
                        'windows': element.state === false ? '🪟' : '⬜',
                        'sensors': element.state === true ? '👤' : '🚫',
                        'doors': element.state === false ? '🚪' : '🚫'
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
                createRoomInDB({
                    roomName: room.name
                }).then(roomData => {
                    room.dbId = roomData.id;
                    rooms.set(position, room);
                    updateSidebar();
                    updateGrid();
                });
            };
            return cell;
        }
    }

    // Ajouter cette nouvelle fonction helper
    function getStateClass(type, state) {
        switch(type) {
            case 'lights':
            case 'alarms':
            case 'sensors':
                return state ? 'on' : 'off';
            case 'windows':
            case 'doors':
                return state ? 'closed' : 'open';
            default:
                return '';
        }
    }

    // Rendre les fonctions globales
    window.deleteRoom = deleteRoom;
    window.addElement = addElement;
    window.deleteElement = deleteElement;
    window.toggleElementState = toggleElementState;

    // Initialiser l'interface
    updateGrid();

    // Fonction pour récupérer l'état d'un élément spécifique
    async function fetchElementState(type, id) {
        try {
            const apiUrl = getApiUrlForType(type);
            const response = await fetch(`${apiUrl}/${id}`);
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${type} state:`, error);
        }
    }

    // Fonction utilitaire pour obtenir l'URL API correspondante au type
    function getApiUrlForType(type) {
        const apiUrls = {
            'lights': LIGHTS_API_URL,
            'alarms': ALARMS_API_URL,
            'windows': WINDOWS_API_URL,
            'doors': DOORS_API_URL,
            'sensors': SENSORS_API_URL
        };
        return apiUrls[type];
    }

    // Fonction pour mettre à jour l'état d'un élément dans l'interface
    function updateElementStateInUI(room, type, elementIndex, newState) {
        const element = room[type][elementIndex];
        if (element) {
            const oldState = element.state;
            const stateKey = type === 'windows' || type === 'doors' ? 'closed' : 'active';
            
            if (oldState !== newState[stateKey]) {
                element.state = newState[stateKey];
                console.log(`${type} ${element.fullName} state changed from ${oldState} to ${element.state}`);
                updateGrid();
            }
        }
    }

    // Fonction pour vérifier périodiquement l'état de tous les éléments
    async function pollElementsState() {
        rooms.forEach(room => {
            const types = ['lights', 'alarms', 'windows', 'doors', 'sensors'];
            
            types.forEach(type => {
                room[type].forEach((element, index) => {
                    if (element.dbId) {
                        fetchElementState(type, element.dbId)
                            .then(newState => {
                                if (newState) {
                                    updateElementStateInUI(room, type, index, newState);
                                }
                            });
                    }
                });
            });
        });
    }

    // Démarrer le polling toutes les 2 secondes
    setInterval(pollElementsState, 2000);
});

