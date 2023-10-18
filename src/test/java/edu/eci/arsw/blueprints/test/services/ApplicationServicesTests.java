package edu.eci.arsw.blueprints.test.services;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.impl.InMemoryBlueprintPersistence;
import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest()
public class ApplicationServicesTests {

    @Autowired
    InMemoryBlueprintPersistence bp;

    @org.junit.jupiter.api.Test
    public void setBluePrintTest() throws BlueprintNotFoundException {
        // Crear un blueprint nuevo con los puntos nuevos.
        Point[] newPoints = new Point[]{new Point(10, 10), new Point(20, 20)};
        Blueprint newBlueprint = new Blueprint("juan", "casa", newPoints);

        // Llamar al método setBluePrint() con el blueprint nuevo, el autor y el nombre del blueprint.
        bp.setBluePrint(newBlueprint, "juan", "casa");

        // Obtener el blueprint actualizado del método getBlueprint().
        Blueprint updatedBlueprint = bp.getBlueprint("juan", "casa");

        // Comparar el blueprint actualizado con el blueprint nuevo para verificar que los puntos sean iguales.
        assertEquals(newBlueprint, updatedBlueprint);
    }

}
