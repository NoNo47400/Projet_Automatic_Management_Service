-- Permet de supprimer la base de données si elle existe
DROP DATABASE IF EXISTS archi_service;

-- Création de la base de données pour le service utilisateur
CREATE DATABASE IF NOT EXISTS archi_service;
USE archi_service;

-- Création de la table des salles
CREATE TABLE IF NOT EXISTS rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(255) UNIQUE NOT NULL
);

-- Création de la table des alarmes
CREATE TABLE IF NOT EXISTS alarms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    alarm_name VARCHAR(255) UNIQUE NOT NULL,
    room_id BIGINT NOT NULL,
    active BOOLEAN NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Création de la table des portes
CREATE TABLE IF NOT EXISTS doors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    door_name VARCHAR(255) UNIQUE NOT NULL,
    room_id BIGINT NOT NULL,
    closed BOOLEAN NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Création de la table des lumières
CREATE TABLE IF NOT EXISTS lights (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    light_name VARCHAR(255) UNIQUE NOT NULL,
    room_id BIGINT NOT NULL,
    active BOOLEAN NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Création de la table des capteurs de présence
CREATE TABLE IF NOT EXISTS sensors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sensor_name VARCHAR(255) UNIQUE NOT NULL,
    room_id BIGINT NOT NULL,
    active BOOLEAN NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Création de la table des fenêtres
CREATE TABLE IF NOT EXISTS windows (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    window_name VARCHAR(255) UNIQUE NOT NULL,
    room_id BIGINT NOT NULL,
    closed BOOLEAN NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Création de la table des users
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) UNIQUE NOT NULL,
    room_id BIGINT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Création de la table des heures de travail
CREATE TABLE IF NOT EXISTS working_hours (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    working_hour_name VARCHAR(255) UNIQUE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    current_time_value TIME NOT NULL
);

SET FOREIGN_KEY_CHECKS = 1;