const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
let pos = 12;
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0];
//E0 I1 S2 N3 T4 F5 J6 P7
var i = 0;
//AGE SEX 1 2 3 4 5 6 7
function calResult() {
	console.log(select);
	/*select.sort();*/

	if (select[0] == Math.max(select[0], select[1])) {
		var result1 = 0;
	}
	else {
		var result1 = 1;
	}

	if (select[2] == Math.max(select[2], select[3])) {
		var result2 = 2;
	}
	else {
		var result2 = 3;
	}

	if (select[4] == Math.max(select[4], select[5])) {
		var result3 = 4;
	}
	else {
		var result3 = 5;
	}

	if (select[6] == Math.max(select[6], select[7])) {
		var result4 = 6;
	}
	else {
		var result4 = 7;
	}

	var str_res = result1.toString() + result2.toString() + result3.toString() + result4.toString();
	return str_res;
}

function setResult() {
	let point = calResult();
	if (point == '0246') { pos = 0; }
	else if (point == '0247') { pos = 1; }
	else if (point == '0256') { pos = 2; }
	else if (point == '0257') { pos = 3; }
	else if (point == '0346') { pos = 4; }
	else if (point == '0347') { pos = 5; }
	else if (point == '0356') { pos = 6; }
	else if (point == '0357') { pos = 7; }
	else if (point == '1246') { pos = 8; }
	else if (point == '1247') { pos = 9; }
	else if (point == '1256') { pos = 10; }
	else if (point == '1257') { pos = 11; }
	else if (point == '1346') { pos = 12; }
	else if (point == '1347') { pos = 13; }
	else if (point == '1356') { pos = 14; }
	else if (point == '1357') { pos = 15; }
	sessionStorage.setItem("pos", pos); // 저장