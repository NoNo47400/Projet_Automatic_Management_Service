package fr.insa.mas.Alarms;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlarmsRepository extends JpaRepository<Alarm, Long> {
}