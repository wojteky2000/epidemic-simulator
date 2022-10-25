package com.treative_recrutation.epidemic_simulator.repositories;

import com.treative_recrutation.epidemic_simulator.models.Simulation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SimulationRepository extends JpaRepository<Simulation, Long> {
}
