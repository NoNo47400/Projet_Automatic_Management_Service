package fr.insa.mas.Lights;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LightsRepository extends JpaRepository<Light, Long> {
}