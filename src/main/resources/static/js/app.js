$(document).ready(function () {
    var nameBlue = '';
    var auName = '';
    var points = [];
    $('#btnUpdateBlueprints').click(function () {
        const authorName = $('#authorNameInput').val();
        const apiType = $('#apiType').val();
        updateBlueprintsByAuthor(authorName, apiType);
    });
    $('#blueprintsTable tbody').on('click', 'button.viewBlueprint', function () {
        const authorName = $(this).data('author');
        const blueprintName = $(this).data('blueprint');
        setBluePrintName(blueprintName);
        setAuthorName (authorName);
        const apiType = $('#apiType').val();
        getBlueprintsByNameAndAuthor(authorName, blueprintName, apiType);
    });

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
          points.push(newPoint);
          drawPoint(newPoint);
          console.log(points);
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
        if (canvas.ultimoPuntoDibujado) {
            ctx.beginPath();
            ctx.moveTo(canvas.ultimoPuntoDibujado.x, canvas.ultimoPuntoDibujado.y);
            ctx.lineTo(nuevoPunto.x, nuevoPunto.y);
            ctx.strokeStyle = "blue"; 
            ctx.lineWidth = 2;
            ctx.stroke();
            canvas.ultimoPuntoDibujado = nuevoPunto;
        }
      }
    
    function drawBlueprint(blueprint) {

        const canvas = document.getElementById("blueprintCanvas");
        const ctx = canvas.getContext("2d");
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
      
        ctx.beginPath();
        ctx.moveTo(blueprint.points[0].x ,blueprint.points[0].y );

        blueprint.points.forEach(function (point, index) {
          if (index > 0) {
            ctx.lineTo(point.x ,point.y);
          }
        });
        ctx.stroke();

        if (blueprint.points.length > 0) {
            const ultimoPuntoDibujado = blueprint.points[blueprint.points.length - 1];
            canvas.ultimoPuntoDibujado = ultimoPuntoDibujado;
        }
      }
    
    
    function getOffset(obj) {
        var offsetLeft = 0;
        var offsetTop = 0;
        do {
          if (!isNaN(obj.offsetLeft)) {
            offsetLeft += obj.offsetLeft;
          }
          if (!isNaN(obj.offsetTop)) {
            offsetTop += obj.offsetTop;
          }
          obj = obj.offsetParent;
        } while (obj);
        return { left: offsetLeft, top: offsetTop };
      }
      
    function prueba() {
        const blueprint = {
            author: auName,
            name: nameBlue,
            points: [
                {
                    x: 10,
                    y: 10
                },
                {
                    x: 20,
                    y: 20
                }
            ]
        };

        apiclient.updateBlueprint("juan", "casa", blueprint, function(data) {
            console.log(data);
        });
    }
    init();
});
