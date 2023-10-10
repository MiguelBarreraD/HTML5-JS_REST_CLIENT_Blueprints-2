//@author hcadavid

apimock = (function () {

    var mockdata = [];
	var selectedAuthor = "";
    var selectedBlueprints = [];

    mockdata["johnconnor"] = [
        {
            author: "johnconnor",
            points: [{ x: 150, y: 120 }, { x: 215, y: 115 }, { x: 180, y: 90 }, { x: 240, y: 80 }],
            name: "house"
        },
        {
            author: "johnconnor",
            points: [{ x: 340, y: 240 }, { x: 15, y: 215 }, { x: 280, y: 200 }, { x: 100, y: 180 }],
            name: "gear"
        },
        {
            author: "johnconnor",
            points: [{ x: 200, y: 180 }, { x: 300, y: 250 }, { x: 250, y: 220 }, { x: 350, y: 280 }],
            name: "car"
        },
        {
            author: "johnconnor",
            points: [{ x: 120, y: 90 }, { x: 180, y: 75 }, { x: 140, y: 60 }, { x: 200, y: 45 }],
            name: "asilo"
        }
    ];
    
    mockdata["maryweyland"] = [
        {
            author: "maryweyland",
            points: [{ x: 140, y: 140 }, { x: 115, y: 115 }, { x: 160, y: 160 }, { x: 185, y: 185 }],
            name: "house2"
        },
        {
            author: "maryweyland",
            points: [{ x: 140, y: 140 }, { x: 115, y: 115 }, { x: 160, y: 160 }, { x: 185, y: 185 }],
            name: "gear2"
        },
        {
            author: "maryweyland",
            points: [{ x: 180, y: 160 }, { x: 210, y: 180 }, { x: 240, y: 200 }, { x: 270, y: 220 }],
            name: "bike"
        },
        {
            author: "maryweyland",
            points: [{ x: 160, y: 130 }, { x: 200, y: 110 }, { x: 190, y: 140 }, { x: 220, y: 160 }],
            name: "sotano"
        }
    ];
    
    mockdata["Miguel"] = [
        {
            author: "Miguel",
            points: [{ x: 160, y: 140 }, { x: 135, y: 115 }, { x: 200, y: 120 }, { x: 220, y: 100 }],
            name: "bookshelf"
        },
        {
            author: "Miguel",
            points: [{ x: 280, y: 220 }, { x: 315, y: 255 }, { x: 260, y: 230 }, { x: 290, y: 245 }],
            name: "couch"
        },
        {
            author: "Miguel",
            points: [{ x: 210, y: 170 }, { x: 240, y: 190 }, { x: 270, y: 210 }, { x: 300, y: 230 }],
            name: "mirror"
        },
        {
            author: "Miguel",
            points: [{ x: 180, y: 130 }, { x: 220, y: 150 }, { x: 200, y: 110 }, { x: 240, y: 130 }],
            name: "book"
        }
    ];
    
    mockdata["Jaider"] = [
        {
            author: "Jaider",
            points: [{ x: 180, y: 120 }, { x: 230, y: 110 }, { x: 200, y: 100 }, { x: 250, y: 90 }],
            name: "chair"
        },
        {
            author: "Jaider",
            points: [{ x: 320, y: 240 }, { x: 40, y: 210 }, { x: 360, y: 220 }, { x: 80, y: 200 }],
            name: "table"
        },
        {
            author: "Jaider",
            points: [{ x: 220, y: 180 }, { x: 330, y: 260 }, { x: 250, y: 220 }, { x: 350, y: 290 }],
            name: "lamp"
        },
        {
            author: "Jaider",
            points: [{ x: 140, y: 90 }, { x: 190, y: 70 }, { x: 160, y: 80 }, { x: 210, y: 60 }],
            name: "desk"
        }
    ];
    

    return {
        getBlueprintsByAuthor: function (authname, callback) {
            selectedAuthor = authname;
            selectedBlueprints = mockdata[authname].map(function (bp) {
                return {
                    name: bp.name,
                    numPoints: bp.points.length
                };
            });
            callback(mockdata[authname]);
        },
		
        getBlueprintsByNameAndAuthor: function (authname, bpname, callback) {
            callback(
                mockdata[authname].find(function (e) { return e.name === bpname })
            );
        }
    }
})();