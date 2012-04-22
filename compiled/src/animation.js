(function() {
  var dist2, set_pages, static_circle;

  set_pages = function(pages) {};

  dist2 = function(p0, p1) {
    return (p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y);
  };

  static_circle = {
    radius: .3,
    max_dots: 6,
    color: [114, 84, 105],
    make_bidder: function() {
      return function(dot) {
        return 1;
      };
    },
    get_points: function() {
      var ang, p, _i, _results;
      _results = [];
      for (p = _i = 0; 0 <= max_dots ? _i < max_dots : _i > max_dots; p = 0 <= max_dots ? ++_i : --_i) {
        ang = 2 * PI * p / max_dots;
        _results.push({
          x: this.radius * Math.cos(ang),
          y: this.radius * math.sin(ang)
        });
      }
      return _results;
    },
    process_dots: function(dots) {
      var d, i, min, mini, p, points, v, _i, _j, _k, _len, _len1, _len2, _results;
      points = get_points;
      for (_i = 0, _len = dots.length; _i < _len; _i++) {
        d = dots[_i];
        d.color = this.color;
        mini = 0;
        min = Infinity;
        for (i = _j = 0, _len1 = points.length; _j < _len1; i = ++_j) {
          p = points[i];
          d = dist2(points[min], p);
          if (d < min) {
            mini = i;
            min = d;
          }
        }
        d.position = points[mini];
        v = points.pop();
        if (mini < points.length) {
          points[mini] = v;
        }
      }
      _results = [];
      for (_k = 0, _len2 = points.length; _k < _len2; _k++) {
        p = points[_k];
        _results.push(make_point({
          color: this.color,
          position: p
        }));
      }
      return _results;
    }
  };

  set_pages([
    {
      shapes: [static_circle],
      'Coursekit started as a toolkit for courses.': 'Coursekit started as a toolkit for courses.'
    }
  ]);

}).call(this);
