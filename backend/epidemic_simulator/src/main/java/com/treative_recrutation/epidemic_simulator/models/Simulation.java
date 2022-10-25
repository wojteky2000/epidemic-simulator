package com.treative_recrutation.epidemic_simulator.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "simulations")
@Getter
@Setter
@NoArgsConstructor
public class Simulation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Long populationSize;
    private Long startInfectedCount;
    private Long rRatio;
    private Long mRatio;
    private Integer daysToRecovery;
    private Integer daysToDeath;
    private Integer simulationLength;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "simulation_id")
    private List<SimulationDay> days;

    public void ResetDays(){
        List<SimulationDay> newDays = new ArrayList<>();
        newDays.add(new SimulationDay(startInfectedCount, populationSize-startInfectedCount, 0L, 0L));
        days = newDays;
    }

    public Simulation(String name, Long populationSize, Long startInfectedCount, Long rRatio, Long mRatio, Integer daysToRecovery, Integer daysToDeath, Integer simulationLength) {
        this.name = name;
        this.populationSize = populationSize;
        this.startInfectedCount = startInfectedCount;
        this.rRatio = rRatio;
        this.mRatio = mRatio;
        this.daysToRecovery = daysToRecovery;
        this.daysToDeath = daysToDeath;
        this.simulationLength = simulationLength;
        List<SimulationDay> days = new ArrayList<>();
        days.add(new SimulationDay(startInfectedCount, populationSize-startInfectedCount, 0L, 0L));
        this.days = days;
    }
}
