apiclient = (function () {
    return {
        getBlueprintsByAuthor: function(authname, callback) {
            $.get(`http://localhost:8080/blueprints/${authname}`, (data) => {
                callback(data);
            })
        },

        getBlueprintsByNameAndAuthor: function(authname,bpname, callback) {
            $.get(`http://localhost:8080/blueprints/${authname}/${bpname}`, (data) => {
                callback(data);
            })
        },

        updateBlueprint: function(authname, bpname, blueprint, callback) {
            $.ajax({
                url: `http://localhost:8080/blueprints/${authname}/${bpname}`,
                type: "PUT",
                data: JSON.stringify(blueprint),
                contentType: "application/json",
                success: function(data) {
                    callback(data);
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }
    }
})();
