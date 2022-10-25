package com.treative_recrutation.epidemic_simulator.simulation;

import com.treative_recrutation.epidemic_simulator.models.Simulation;
import com.treative_recrutation.epidemic_simulator.models.SimulationDay;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

public class Simulator {
    public static void createSimulation(Simulation simulation){
        List<Long> infectedAtDayX = new ArrayList<>();
        infectedAtDayX.add(simulation.getStartInfectedCount());
        int day = 2;
        while (day <= simulation.getSimulationLength())
        {
            Long peopleToDie = day - simulation.getDaysToDeath() - 1 >= 0 ? Long.min(infectedAtDayX.get(day - simulation.getDaysToDeath() - 1),simulation.getMRatio()) : 0;
            if(peopleToDie > 0)
            {
                Long peopleToRecovery = infectedAtDayX.get(day - simulation.getDaysToDeath() - 1) - peopleToDie;
                infectedAtDayX.set(day - simulation.getDaysToDeath() - 1, peopleToRecovery);
            }
            Long peopleToRecovery = day - simulation.getDaysToRecovery() - 1 >= 0 ? infectedAtDayX.get(day - simulation.getDaysToRecovery() - 1) : 0;
            SimulationDay previousDay = simulation.getDays().get(simulation.getDays().size() - 1);
            Long infectedPeople = previousDay.getInfected() - peopleToDie - peopleToRecovery;
            Long deadPeople = previousDay.getDead() + peopleToDie;
            Long recoveredPeople = previousDay.getRecovered() + peopleToRecovery;
            long healthyPeople = simulation.getPopulationSize()-infectedPeople-deadPeople-recoveredPeople;
            long peopleToInfect = Long.min(infectedPeople* simulation.getRRatio(), healthyPeople);
            infectedAtDayX.add(peopleToInfect);
            infectedPeople += peopleToInfect;
            healthyPeople -= peopleToInfect;
            simulation.getDays().add(new SimulationDay(
                    infectedPeople,
                    healthyPeople,
                    deadPeople,
                    recoveredPeople
            ));
            day++;
        }
    }
}
