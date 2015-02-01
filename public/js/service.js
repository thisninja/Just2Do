todoApp.service('transportSrv', ['$http', function($http) {
    this.get = function() {
            return $http.get('/api/todos');
        },
        this.create = function(todoData) {
            return $http.post('/api/todos', todoData);
        },
        this.delete = function(id, ids) {
            if (ids) {
                return $http({
                    method: 'delete',
                    url: '/api/todos/',
                    data: ids,
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                })
            } else {
                return $http.delete('/api/todos/' + id);
            }
        },
        this.update = function(todo, todos) {
            if (todos) {
                return $http.put('/api/todos/' + todo._id, todos);
            } else {
                return $http.put('/api/todos/' + todo._id, todo);
            }
        },
        this.deleteAll = function() {
            return $http.delete('/api/todos');
        }
}]);