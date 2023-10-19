/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Component;

/**
 *
 * @author hcadavid
 */
@Component
public class InMemoryBlueprintPersistence implements BlueprintsPersistence{

    private final Map<Tuple<String,String>,Blueprint> blueprints=new HashMap<>();

    public InMemoryBlueprintPersistence() {
        //load stub data
        
        Point[] pts1 = new Point[]{new Point(140, 140), new Point(115, 115)};
        Blueprint bp1 = new Blueprint("juan", "casa", pts1);
        blueprints.put(new Tuple<>(bp1.getAuthor(), bp1.getName()), bp1);

        Point[] pts2 = new Point[]{new Point(155, 180), new Point(115, 115)};
        Blueprint bp2 = new Blueprint("juan", "Casa de invierno", pts2);
        blueprints.put(new Tuple<>(bp2.getAuthor(), bp2.getName()), bp2);

        Point[] pts3 = new Point[]{new Point(160, 145), new Point(120, 120)};
        Blueprint bp3 = new Blueprint("maria", "apartamento", pts3);
        blueprints.put(new Tuple<>(bp3.getAuthor(), bp3.getName()), bp3);

        Point[] pts4 = new Point[]{new Point(175, 185), new Point(120, 120)};
        Blueprint bp4 = new Blueprint("maria", "Chalet de playa", pts4);
        blueprints.put(new Tuple<>(bp4.getAuthor(), bp4.getName()), bp4);

        Point[] pts5 = new Point[]{new Point(150, 150), new Point(125, 125)};
        Blueprint bp5 = new Blueprint("carlos", "mansión", pts5);
        blueprints.put(new Tuple<>(bp5.getAuthor(), bp5.getName()), bp5);

        Point[] pts6 = new Point[]{new Point(165, 195), new Point(125, 125)};
        Blueprint bp6 = new Blueprint("carlos", "Casa de campo", pts6);
        blueprints.put(new Tuple<>(bp6.getAuthor(), bp6.getName()), bp6);

        Point[] pts7 = new Point[]{new Point(145, 155), new Point(130, 130)};
        Blueprint bp7 = new Blueprint("laura", "dúplex", pts7);
        blueprints.put(new Tuple<>(bp7.getAuthor(), bp7.getName()), bp7);

        Point[] pts8 = new Point[]{new Point(160, 200), new Point(130, 130)};
        Blueprint bp8 = new Blueprint("laura", "Penthouse", pts8);
        blueprints.put(new Tuple<>(bp8.getAuthor(), bp8.getName()), bp8);

        Point[] pts9 = new Point[]{new Point(155, 160), new Point(135, 135)};
        Blueprint bp9 = new Blueprint("pablo", "loft", pts9);
        blueprints.put(new Tuple<>(bp9.getAuthor(), bp9.getName()), bp9);

        Point[] pts10 = new Point[]{new Point(170, 210), new Point(135, 135)};
        Blueprint bp10 = new Blueprint("pablo", "bungalow", pts10);
        blueprints.put(new Tuple<>(bp10.getAuthor(), bp10.getName()), bp10);
                
    }    
    
    @Override
    public synchronized void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(),bp.getName()))){
            throw new BlueprintPersistenceException("The given blueprint already exists: "+bp);
        }
        else{
            blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        }        
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        return blueprints.get(new Tuple<>(author, bprintname));
    }

    @Override
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException {
        Set<Blueprint> result = new HashSet<>();
        for (Blueprint value : blueprints.values()) { 
            if (value.getAuthor().equals(author)) {
                result.add(value);
            }
        }
        return result;
    }

    @Override
    public Set<Blueprint> getAllBlueprints() throws BlueprintNotFoundException {
        Set<Blueprint> result = new HashSet<>();
        for (Blueprint value : blueprints.values()) { 
            result.add(value);
            System.out.println(value.getName());
        }
        return result;
    }

    @Override
    public synchronized void setBluePrint(Blueprint bluePrint, String author, String name) throws BlueprintNotFoundException{
        Blueprint currentBlue = getBlueprint(author, name);
        if (currentBlue == null) {
            throw new BlueprintNotFoundException(BlueprintNotFoundException.NONEXISTENT);
        } else {
            currentBlue.setPoints(bluePrint.getPoints());
        }
    }

    @Override
    public void deleteBlueprint(String author, String name) throws BlueprintNotFoundException {
        if(!blueprints.containsKey(new Tuple<>(author, name))) throw new BlueprintNotFoundException("No existe.");
        blueprints.remove(new Tuple<>(author, name));
    }
}
