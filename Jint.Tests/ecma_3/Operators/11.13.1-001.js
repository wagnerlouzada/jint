/* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is JavaScript Engine testing utilities.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corp.
 * Portions created by the Initial Developer are Copyright (C) 2003
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   brendan@mozilla.org, pschwartau@netscape.com
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

/*
 *
 * Date:    08 May 2003
 * SUMMARY: JS should evaluate RHS before binding LHS implicit variable
 *
 * See http://bugzilla.mozilla.org/show_bug.cgi?id=204919
 *
 */
//-----------------------------------------------------------------------------
var gTestfile = '11.13.1-001.js';
var UBound = 0;
var BUGNUMBER = 204919;
var summary = 'JS should evaluate RHS before binding LHS implicit variable';
var TEST_PASSED = 'ReferenceError';
var TEST_FAILED = 'Generated an error, but NOT a ReferenceError!';
var TEST_FAILED_BADLY = 'Did not generate ANY error!!!';
var status = '';
var statusitems = [];
var actual = '';
var actualvalues = [];
var expect= '';
var expectedvalues = [];


/*
 * global scope -
 */
status = inSection(1);
try
{
  x = x;
  actual = TEST_FAILED_BADLY;
}
catch(e)
{
  if (e instanceof ReferenceError)
    actual = TEST_PASSED;
  else
    actual = TEST_FAILED;
}
expect = TEST_PASSED;
addThis();


/*
 * function scope -
 */
status = inSection(2);
try
{
  (function() {y = y;})();
  actual = TEST_FAILED_BADLY;
}
catch(e)
{
  if (e instanceof ReferenceError)
    actual = TEST_PASSED;
  else
    actual = TEST_FAILED;
}
expect = TEST_PASSED;
addThis();


/*
 * eval scope -
 */
status = inSection(3);
try
{
  eval('z = z');
  actual = TEST_FAILED_BADLY;
}
catch(e)
{
  if (e instanceof ReferenceError)
    actual = TEST_PASSED;
  else
    actual = TEST_FAILED;
}
expect = TEST_PASSED;
addThis();




//-----------------------------------------------------------------------------
test();
//-----------------------------------------------------------------------------



function addThis()
{
  statusitems[UBound] = status;
  actualvalues[UBound] = actual;
  expectedvalues[UBound] = expect;
  UBound++;
}


function test()
{
  enterFunc('test');
  printBugNumber(BUGNUMBER);
  printStatus(summary);

  for (var i=0; i<UBound; i++)
  {
    reportCompare(expectedvalues[i], actualvalues[i], statusitems[i]);
  }

  exitFunc ('test');
}
