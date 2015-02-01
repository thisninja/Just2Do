todoApp.directive('editOnDbclick', function($rootScope) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, elem, attrs) {
            elem.bind('dblclick', function(e) {
                scope.$parent.$parent.isReadonly = false;
                attrs.$set("readonly", "false");
                elem.focus();
            })
        }
    }
});
todoApp.directive('changeOnBlur', function($http) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.bind('change', function(e) {
                if (!attrs.readonly) {
                    scope.$parent.$parent.update(scope.todo);
                }
            });

        }
    }
});
