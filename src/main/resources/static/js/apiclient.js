apiclient = (function () {
    return {
        getBlueprintsByAuthor:function(authname,callback){
            $.get(`http://localhost:8080/blueprints/${authname}`, (data) => {
                callback(data);
            })
        },

        getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
            $.get(`http://localhost:8080/blueprints/${authname}/${bpname}`, (data) => {
                callback(data);
            })
        },
    }
})();