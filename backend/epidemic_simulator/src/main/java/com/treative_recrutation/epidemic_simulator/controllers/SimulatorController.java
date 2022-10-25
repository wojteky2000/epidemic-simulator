package com.treative_recrutation.epidemic_simulator.controllers;

import com.treative_recrutation.epidemic_simulator.models.Simulation;
import com.treative_recrutation.epidemic_simulator.repositories.SimulationRepository;
import com.treative_recrutation.epidemic_simulator.simulation.Simulator;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/simulations")
public class SimulatorController {
    final SimulationRepository simulationRepository;

    public SimulatorController(SimulationRepository simulationRepository) {
        this.simulationRepository = simulationRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllSimulations() {
        List<Simulation> simulations = simulationRepository.findAll();
        Collections.reverse(simulations);
        return ResponseEntity.ok(simulations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSimulation(@PathVariable Long id){
        Optional<Simulation> optionalSimulation = simulationRepository.findById(id);
        if(optionalSimulation.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optionalSimulation.get());
    }

    @PostMapping
    public ResponseEntity<?> createSimulation(@RequestBody Simulation simulation){
        simulation.ResetDays();
        Simulator.createSimulation(simulation);
        simulationRepository.save(simulation);
        return ResponseEntity.ok(simulation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSimulation(@PathVariable Long id, @RequestBody Simulation simulation){
        Optional<Simulation> optionalSimulation = simulationRepository.findById(id);
        if(optionalSimulation.isEmpty())
        {
            return ResponseEntity.notFound().build();
        }
        simulation.setId(id);
        simulation.ResetDays();
        Simulator.createSimulation(simulation);
        simulationRepository.save(simulation);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSimulation(@PathVariable Long id){
        simulationRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
