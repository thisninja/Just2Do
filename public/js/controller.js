todoApp.controller('mainController', ['$scope', '$rootScope', '$http', '$filter', 'transportSrv', function($scope, $rootScope, $http, $filter, transportSrv) {
    $scope.formData = {};
    $scope.isComplete = false;
    $scope.description = ($scope.isComplete) ? 'Active todo' : 'Completed todo';

    $scope.doEditable = function(item) {
        $scope.editable = item;
    };
    $scope.todoObj = {};
    $scope.todoObj.checkAll = false;
    $scope.todoObj.checkedTodo = false;
    $scope.checkedTodosCount = 0;
    $scope.unCheckAll = function(checked) {
        if (checked || $scope.todoObj.checkAll) {
            $scope.todoObj.checkAll = false;
            $scope.checkedTodosCount = 0;
            for (var i = 0; i < $scope.todos.length; i++) {
                $scope.todos[i].checked = $scope.todoObj.checkAll;
            }
        }
    };
    $scope.checkAll = function(condition) {
        if ($scope.todoObj.checkAll) {
            $scope.todoObj.checkAll = false;
            $scope.checkedTodosCount = 0;
        } else {
            $scope.todoObj.checkAll = true;
            $scope.checkedTodosCount = $scope.activeTodos.length;
        }
        for (var i = 0; i < $scope.todos.length; i++) {
            $scope.todos[i].checked = $scope.todoObj.checkAll;
        }


        $scope.loading = true;
        $scope.prepareToDelete = false;
    };
    $scope.$watch('todos', function(val) {
        $scope.activeTodos = val;
        $scope.activeTodos = $filter('filter')($scope.activeTodos, {
            done: false
        });
        $scope.completedTodos = $filter('filter')($scope.todos, {
            done: true
        })
    });
    $scope.checkTheTodos = function(index) {
        if ($scope.activeTodos[index].checked) {
            $scope.checkedTodosCount += 1;
            if ($scope.checkedTodosCount > 0) {
                $scope.todoObj.checkAll = true;
            } else {
                $scope.todoObj.checkAll = false;
            }

        } else if (!$scope.activeTodos[index].checked) {
            $scope.checkedTodosCount -= 1;
            ($scope.checkedTodosCount > 0) ?
            $scope.todoObj.checkAll = true: $scope.todoObj.checkAll = false;
        }
    };
    transportSrv.get()
        .success(function(data) {
            $scope.todos = data;
            $scope.loading = false;
        });
    $scope.createTodo = function() {
        $scope.unCheckAll(true);
        $scope.todoObj.checkAll = false;
        if ($scope.formData.text != undefined) {
            $scope.loading = true;
            transportSrv.create($scope.formData)
                .success(function(data) {
                    $scope.loading = false;
                    $scope.formData = {};
                    $scope.todos = data;
                });
        }
    };
    $scope.deleteTodo = function(id) {
        $scope.loading = true;
        transportSrv.delete(id)
            .success(function(data) {
                $scope.loading = false;
                $scope.todos = data;
            });
    };

    $scope.removeAll = function() {
        transportSrv.deleteAll()
            .success(function(data) {
                $scope.todos = data;
            });
    };
    $scope.update = function(todo, isComplete) {
        if (isComplete) {
            todo.done = true;
        }
        transportSrv.update(todo)
            .success(function(data) {
                $scope.loading = false;
                $scope.todos = data; 
            });
    };
    $scope.updateMultipleTodos = function() {
        var todos = [];
        for (var i = 0; i < $scope.activeTodos.length; i++) {
            if ($scope.activeTodos[i].checked) {
                $scope.activeTodos[i].done = true;
                todos.push($scope.activeTodos[i]);
            }
        }
        transportSrv.update(todos[0], todos).success(function(data, status, headers, config) {
            $scope.loading = false;
            $scope.todos = data;
            $scope.checkedTodosCount -= todos.length;
        }).error(function(data, status, headers, config) {
            console.error(data);
        });
    };
    $scope.deleteTodos = function() {
        var ids = [];
        for (var i = 0; i < $scope.activeTodos.length; i++) {
            if ($scope.activeTodos[i].checked) {
                ids.push($scope.activeTodos[i]._id);
            }
        }
        transportSrv.delete(ids[0], ids).success(function(data, status, headers, config) {
            $scope.loading = false;
            $scope.todos = data;
            $scope.checkedTodosCount -= ids.length;
        }).error(function(data, status, headers, config) {
            console.error(data);
        });
    }
}]);