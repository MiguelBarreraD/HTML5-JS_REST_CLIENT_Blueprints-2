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
        },

        postBlueprint: function(author, blueprintName){
            var data = JSON.stringify({
                author: author,
                "points": [],
                "name": blueprintName
            });
            return new Promise(function(resolve, reject) {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/blueprints/",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: data
                }).then(resolve).catch(function(err) {
                    console.log(err);
                    postBlueprint(author, blueprintName).then(resolve).catch(reject);
                });
            });
        },

        deleteBluePrint: function (author, blueprintName) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `http://localhost:8080/blueprints/${author}/${blueprintName}`,
                    type: 'DELETE',
                    contentType: "application/json",
                    success: function (result) {
                        resolve(result);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });
        }
    }
})();
