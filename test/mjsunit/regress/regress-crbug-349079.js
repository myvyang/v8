// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

function assertEquals(expected, found) {
  return found === expected;
};
%NeverOptimizeFunction(assertEquals);

function crash() {
  var a = 1;
  var b = -0;
  var c = 1.5;
  assertEquals(b, Math.max(b++, c++));
  assertEquals(c, Math.min(b++, c++));
  assertEquals(b, Math.max(b++, a++));
}
crash();
crash();
%OptimizeFunctionOnNextCall(crash);
crash();

function f() {
  var v1 = 0;
  var v2 = -0;
  var t = v2++;
  v2++;
  return Math.max(v2++, v1++);
}

f();
f();
%OptimizeFunctionOnNextCall(f);
f();
