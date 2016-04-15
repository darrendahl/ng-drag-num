# ng-drag-num
An Angular directive for increasing and decreasing values on drag

Works on both mousedown and touchstart (mobile) events.


Install using bower:
```
bower install ng-drag-num
```

Include to module:
```
angular.module('angularApp', [
  'ngDragNum',
])
```

Start using:
```
  <ng-drag-num num="value" on-change="callback"></ng-drag-num>
```


MIT LICENSE
