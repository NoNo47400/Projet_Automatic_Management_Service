package fr.insa.mas.Windows;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WindowsRepository extends JpaRepository<Window, Long> {
}