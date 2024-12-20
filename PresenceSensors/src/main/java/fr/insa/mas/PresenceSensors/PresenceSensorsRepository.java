package fr.insa.mas.PresenceSensors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PresenceSensorsRepository extends JpaRepository<PresenceSensor, Long> {
}