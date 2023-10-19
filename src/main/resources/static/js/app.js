$(document).ready(function () {
    const formularioBlueprint = document.getElementById('formularioBlueprint');
    const btnAcetpNewBlueprint = document.getElementById('btnAcetpNewBlueprint');
    formularioBlueprint.style.display = 'none';
    btnAcetpNewBlueprint.style.display = 'none';
    var nameBlue = '';
    var auName = '';
    var points = [];
    $('#btnUpdateBlueprints').click(function () {
        const authorName = $('#authorNameInput').val();
        const apiType = $('#apiType').val();
        updateBlueprintsByAuthor(authorName, apiType);
        clearCanva();
    });
    $('#blueprintsTable tbody').on('click', 'button.viewBlueprint', function () {
        const authorName = $(this).data('author');
        const blueprintName = $(this).data('blueprint');
        setBluePrintName(blueprintName);
        setAuthorName (authorName);
        const apiType = $('#apiType').val();
        getBlueprintsByNameAndAuthor(authorName, blueprintName, apiType);
        resetPoints();
    });

    $('#updateBluePrint').on('click', function () {
        const authorName = auName;
        const blueprintName = nameBlue;
        const newPoints = points;
        const apiType = $('#apiType').val();
        updateBlueprint(authorName, blueprintName, newPoints);
        updateBlueprintsByAuthor(authorName, apiType);
        resetPoints();
    });

    $('#btnCreateBlueprints').on('click', function () {
        resetPoints();
        formularioBlueprint.style.display = 'block';
        btnAcetpNewBlueprint.style.display = 'block';
        $('#btnUpdateBlueprints, #btnCreateBlueprints, #updateBluePrint, #deleteBluePrint').prop('disabled', true);
    });


    $('#btnAcetpNewBlueprint').on('click', function () {
        resetPoints();
        const authorName = $('#authorNameInput').val();
        const bpName = $('#blueprintNameInput').val();
        const apiType = $('#apiType').val();
        if (authorName == '' || bpName == '') {
            alert("Ni el nombre del autor o nombre de plano puede ser vacio");
        }
        else {
            createBluePrint(authorName,bpName);
            formularioBlueprint.style.display = 'none';
            btnAcetpNewBlueprint.style.display = 'none';
            $('#blueprintNameInput').val('');
            $('#btnUpdateBlueprints, #btnCreateBlueprints, #updateBluePrint, #deleteBluePrint').prop('disabled', false);
            updateBlueprintsByAuthor(authorName, apiType);
        }  
        
    });
    
    $('#deleteBluePrint').on('click', function () {
        resetPoints();
        const authorName = auName;
        const blueprintName = nameBlue;
        const apiType = $('#apiType').val();
        if (blueprintName == '' || authorName == '') {
            alert("Seleccione un blueprint para poder eliminarlo");
        } else {  
            deleteBluePrint(authorName,blueprintName);
            updateBlueprintsByAuthor(authorName, apiType);
            setBluePrintName('');
            setAuthorName('');
        }
    });

    function resetPoints() {
        points = []; 
    }
    

    function setBluePrintName(name) {
        nameBlue = name; 
    }

    function setAuthorName(name) {
        auName = name;
    }

    function init() {
        var canvas = document.getElementById("blueprintCanvas");
        context = canvas.getContext("2d");
      
        canvas.addEventListener("pointerdown", function (event) {
          const rect = canvas.getBoundingClientRect();
          const newPoint = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          };
          if (nameBlue != '') {
            points.push(newPoint);
            drawPoint(newPoint);
          } else {
            alert("Selecione un blueprint");
        }
        });
    }
      

    function updateBlueprintsByAuthor(authorName, apiType) {
        const tableBody = $('#blueprintsTable tbody');

        tableBody.empty();

        if (apiType === 'apiclient') {
            apiclient.getBlueprintsByAuthor(authorName, function (blueprints) {
                blueprints.forEach(function (bp) {
                    const row = $('<tr>');
                    row.append($('<td>').text(bp.name));
                    row.append($('<td>').text(bp.points.length));
                    row.append($('<td>').html('<button class="btn btn-primary viewBlueprint" data-author="' + authorName + '" data-blueprint="' + bp.name + '">Ver</button>'));
                    tableBody.append(row);
                });

                const totalPoints = blueprints.reduce(function (acc, bp) {
                    return acc + bp.points.length;
                }, 0);

                $('#totalPoints').text(totalPoints);
            });
        } else if (apiType === 'apimock') {
            apimock.getBlueprintsByAuthor(authorName, function (blueprints) {
                blueprints.forEach(function (bp) {
                    const row = $('<tr>');
                    row.append($('<td>').text(bp.name));
                    row.append($('<td>').text(bp.points.length));
                    row.append($('<td>').html('<button class="btn btn-primary viewBlueprint" data-author="' + authorName + '" data-blueprint="' + bp.name + '">Ver</button>'));
                    tableBody.append(row);
                });

                const totalPoints = blueprints.reduce(function (acc, bp) {
                    return acc + bp.points.length;
                }, 0);

                $('#totalPoints').text(totalPoints);
            });
        }
    }

    function getBlueprintsByNameAndAuthor(authorName, bpname, apiType) {
        if (apiType === 'apiclient') {
            apiclient.getBlueprintsByNameAndAuthor(authorName, bpname, function (blueprint) {
                if (blueprint) {
                    drawBlueprint(blueprint);
                }
            });
        } else if (apiType === 'apimock') {
            apimock.getBlueprintsByNameAndAuthor(authorName, bpname, function (blueprint) {
                if (blueprint) {
                    drawBlueprint(blueprint);
                }
            });
        }
    }

    function drawPoint(nuevoPunto) {
        var canvas = document.getElementById("blueprintCanvas");
        const ctx = canvas.getContext("2d");
      
        // Si no hay ningún punto dibujado, establece el nuevo punto como el último punto dibujado
        if (!canvas.ultimoPuntoDibujado) {
          canvas.ultimoPuntoDibujado = nuevoPunto;
        }
      
        ctx.beginPath();
        ctx.moveTo(canvas.ultimoPuntoDibujado.x, canvas.ultimoPuntoDibujado.y);
        ctx.lineTo(nuevoPunto.x, nuevoPunto.y);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();

        canvas.ultimoPuntoDibujado = nuevoPunto;
      }
    
    function clearCanva() {
        const canvas = document.getElementById("blueprintCanvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.ultimoPuntoDibujado = null;
    }
    function drawBlueprint(blueprint) {
        clearCanva();
        if (blueprint.points.length === 0) {
          return;
        }
        const canvas = document.getElementById("blueprintCanvas");
        const ctx = canvas.getContext("2d");
      
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
      
        ctx.beginPath();
        ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y);
      
        blueprint.points.forEach(function (point, index) {
          if (index > 0) {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      
        if (blueprint.points.length > 0) {
          const ultimoPuntoDibujado = blueprint.points[blueprint.points.length - 1];
          canvas.ultimoPuntoDibujado = ultimoPuntoDibujado;
        }
    }
      
    
      
    function updateBlueprint(authorName, blueprintName, newPoints) {
        apiclient.getBlueprintsByNameAndAuthor(authorName, blueprintName, function (blueprint) {
            if (blueprint) {
                const currentPoints = blueprint.points;
                const updatedPoints = currentPoints.concat(newPoints);
                apiclient.updateBlueprint(authorName, blueprintName, { points: updatedPoints }, function (data) {});
            }
        });
    }

    function createBluePrint(authorName, blueprintName) {
        apiclient.postBlueprint(authorName, blueprintName);
    }
    function deleteBluePrint(authorName, blueprintName) {
        apiclient.deleteBluePrint(authorName, blueprintName);
    }
    init();
});
