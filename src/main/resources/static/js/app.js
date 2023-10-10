$(document).ready(function () {
    $('#btnUpdateBlueprints').click(function () {
        const authorName = $('#authorNameInput').val();
        const apiType = $('#apiType').val();
        updateBlueprintsByAuthor(authorName, apiType);
    });

    $('#blueprintsTable tbody').on('click', 'button.viewBlueprint', function () {
        const authorName = $(this).data('author');
        const blueprintName = $(this).data('blueprint');
        const apiType = $('#apiType').val();
        getBlueprintsByNameAndAuthor(authorName, blueprintName, apiType);
    });

    function updateBlueprintsByAuthor(authorName, apiType) {
        const tableBody = $('#blueprintsTable tbody');

        // Limpiar la tabla antes de agregar las nuevas filas
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

    function drawBlueprint(blueprint) {
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
    }
});
