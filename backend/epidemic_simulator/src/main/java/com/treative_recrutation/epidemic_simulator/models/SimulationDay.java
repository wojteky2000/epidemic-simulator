package com.treative_recrutation.epidemic_simulator.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "simulation_days")
@Getter
@Setter
@NoArgsConstructor
public class SimulationDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long infected;
    private Long healthy;
    private Long dead;
    private Long recovered;

    public SimulationDay(Long infected, Long healthy, Long dead, Long recovered) {
        this.infected = infected;
        this.healthy = healthy;
        this.dead = dead;
        this.recovered = recovered;
    }
}
