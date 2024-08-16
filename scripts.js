const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
let pos = 12;
const endPoint = 11;
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

	//const resultName = document.querySelector('.resultname');
	//resultName.innerHTML = infoList[pos].name;
	//console.log();
	
	// var str = "";
	// for (var j = 0; j < 10; j++) {
	// 	str += sessionStorage.getItem("data_" + j).toString(); // 저장
	// }
	// var str1 = str.substr(0, 5);
	// var str2 = str.substr(5, 5);	
	// str1 = parseInt(str1)*3+126;
	// str2 = parseInt(str2)+2715;
	// str= String(str1)+String(str2);
	location.href = window.location.protocol + "//" + window.location.host + '/site/MBTI/result.html?'+point;

	/*var resultImg = document.createElement('img');
	const imgDiv = document.querySelector('#resultImg');
	var imgURL = 'image/' + point + '.png';
	resultImg.src = imgURL;
	resultImg.alt = point;
	resultImg.classList.add('img-fluid');
	imgDiv.appendChild(resultImg);*/

	//const resultDesc = document.querySelector('.resultDesc');
	//resultDesc.innerHTML = infoList[pos].desc;
}
	
	function goResult() {
		/*qna.style.WebkitAnimation = "fadeOut 1s";
		qna.style.animation = "fadeOut 1s";
		setTimeout(() => {
			result.style.WebkitAnimation = "fadeIn 1s";
			result.style.animation = "fadeIn 1s";
			setTimeout(() => {
				qna.style.display = "none";
				result.style.display = "block"
			}, 450)
		})*/
	
		setResult();
	}
	
	function addAnswer(answerText, qIdx, idx) {
		var a = document.querySelector('.answerBox');
		var answer = document.createElement('button');
		answer.classList.add('answerList');
		answer.classList.add('my-3');
		answer.classList.add('py-3');
		answer.classList.add('mx-auto');
		answer.classList.add('fadeIn');
	
		a.appendChild(answer);
		answer.innerHTML = answerText;
	
		answer.addEventListener("click", function() {
			var children = document.querySelectorAll('.answerList');
			for (let i = 0; i < children.length; i++) {
				children[i].disabled = true;
				children[i].style.WebkitAnimation = "fadeOut 0.5s";
				children[i].style.animation = "fadeOut 0.5s";
			}
			setTimeout(() => {
				var target = qnaList[qIdx].a[idx].type;
				// var data = qnaList[qIdx].a[idx].db;
	
				// if (data[0]!=0) {
				// db_data_save[data[i]] = data[0];
				// console.log("data_" + ":  "+ db_data_save[data[i]] );
				// 	sessionStorage.setItem("data_" + i, db_data_save[data[i]]); // 저장
				// i += 1;
				// }
	
			for (let i = 0; i < target.length; i++) {
	
				select[target[i]] += 1;
			}
			for (let i = 0; i < children.length; i++) {
				children[i].style.display = 'none';
			}
			goNext(++qIdx);
		}, 450)
	}, false);
	}
	
	function goNext(qIdx) {
		if (qIdx === endPoint) {
			goResult();
			return;
		}
	
		var q = document.querySelector('.qBox');
		q.innerHTML = qnaList[qIdx].q;
		for (let i in qnaList[qIdx].a) {
			addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
		}
		var status = document.querySelector('.statusBar');
		status.style.width = (100 / endPoint) * (qIdx + 1) + '%';
	}
	
	function begin() {
		sessionStorage.clear();
		main.style.WebkitAnimation = "fadeOut 1s";
		main.style.animation = "fadeOut 1s";
		setTimeout(() => {
			qna.style.WebkitAnimation = "fadeIn 1s";
			qna.style.animation = "fadeIn 1s";
			setTimeout(() => {
				main.style.display = "none";
				qna.style.display = "block"
				var children = document.querySelectorAll('.answerList');
	
			}, 450)
			let qIdx = 0;
			goNext(qIdx);
	}, 450);
}

//E0 I1 S2 N3 T4 F5 J6 P7


const qnaList = [

	{
		q: '1. 썸남(녀)와 노래방에 갔다, 마지막곡은?',
		a: [
			{ answer: '내가 가장 자신있는 감성적인 발라드를 부른다.', type: [0] },
			{ answer: '이제 슬슬 분위기가 물올랐어, 썸남(녀)와 같이 즐길 수 있는 노래를 부른다.', type: [1] }
		]
	},
	{
		q: '2. 부모님과 노래방을 갔다. 당신의 선곡은? ',
		a: [
			{ answer: '부모님이 잘 아실법한 트로트를 부른다.', type: [0] },
			{ answer: '내가 부모님에게 트렌드를 알려줄 요즘노래를 부른다.', type: [1] }
		]
	},
	{
		q: '3. 절친의 결혼식에 축가를 부르게 되었다. 당신의 선곡은? ',
		a: [
			{ answer: '최선을 다해 불러서 친구가 감동받을 발라드를 부른다.', type: [2] },
			{ answer: '결혼식은 기쁜날이다. 신나는 노래를 불러 이 자리를 축제의 장으로 만든다.', type: [3] }
		]
	},
	{
		q: '4. 늦은 밤 혼자 한강에 산책을 나왔다.',
		a: [
			{ answer: '댄스 음악 박자에 맞춰 걷는다.', type: [0] },
			{ answer: '새벽 감성이 올라온다. 전애인과 즐겨들었던 노래를 들으며 그녀를 추억한다.', type: [1] }
		]
	},
	{
		q: '5. 오늘은 나의 왕 취임식이다. 내가 등장할 때 깔고싶은 배경음악은?',
		a: [
			{ answer: '세상에서 가장 웅장한 음악을 튼다.', type: [5] },
			{ answer: '왕이 되는 이 기분을 숨겨왔던 나의 댄스실력으로 보여준다.', type: [4] }
		]
	},
	{
		q: '6. 오늘은 친했던 친구가 죽은지 1년이 다 되어가는날..',
		a: [
			{ answer: '친구가 좋아했던 노래를 들으며 친구를 추억한다.', type: [3] },
			{ answer: '슬픈 노래를 들으면서 친구를 기억하며 눈물을 흘린다.', type: [2] },
		]
	},
	{
		q: '7. 오늘 직장상사에게 혼났다, 이때 듣고싶은 음악은?',
		a: [
			{ answer: '스트레스를 풀때는 고음만한게 없지', type: [7] },
			{ answer: '댄스음악을 들으며 춤을추면서 밖에서 나는 이런사람이다 라는 것을 일깨운다.', type: [6] }
		]
	},
	{
		q: '8. 친구들에게 1년전 부터 괴롭힘을 당하고있다. 집에가서 나를 위로해주는 것은?',
		a: [
			{ answer: '슬픈 발라드를 들으며 나를 위로해준다.', type: [4] },
			{ answer: '나를 위로해주는건 오직 jpop!', type: [5] }
		]
	},

	{
		q: '9. 운동을 하러온 나를 위해',
		a: [
			{ answer: '운동에 집중할 수있는 서정적인 노래', type: [5] },
			{ answer: '나에게 힘을 불어넣어주는 강렬한노래', type: [4] }
		]
	},
	{
		q: '10. 동성친구와 스키장을 가게되었다. 입장할때 나를 반겨주는 음악은?',
		a: [
			{ answer: '설레는 계절,캐롤과 함께 스키를 즐긴다.', type: [6] },
			{ answer: '주변이 죄다 커플.. 쓸쓸함을 발라드로 달랜다.', type: [7] }
		]
	},
	{
		q: '콘서트를 가게되었다.',
		a: [
			{ answer: '고막이 사르르녹는 노래', type: [2] },
			{ answer: '낭만 넘치는 밴드', type: [3] }
		]
	},
]

const infoList = [
 {
 name: '현실적이면서 리더십 강한 당신 <ESTJ>',
	desc: '<span class="half_HL">○ 성격은?</span><br> 고집이 세고 현실적인 사람입니다! 호불호가 매우 확실해요!<br> 리더 하는 거 너무싫은데 막상 하면 잘하죠! 일처리는 똑 부러지게!<br> 이것저것 배우길 좋아하는 머리 좋은 똑똑이인 나는 눈치가 빠르고 말을 잘해요! 호기심 갑! 지적 욕구도 갑! <br>겉과 속이 일치한 사람이라 차라리 앞 담을 하지 앞에서 못할 얘기는 뒤에서도 안 해요!! 과정보다는 결과가 중요하죠! 완전 워커 홀릭! <br>감정적이기보다 상황 분석 후 누가 잘못했는지 객관적 판단을 해요. <br>하지만 생각만 하지 입 밖으로 내뱉지는 않아요! 사전 계획 철저하지만 융통성 제로!<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 남이 일을 못하면 너무 답답해서 잔소리가 심해져요. 일 잘하는 사람은 좋은 사람, 일 못하는 사람은 나쁜 사람! <br>위로 잘 못해요... 외로움을 잘 못 느끼는 편이라 외로워하는 사람이 이해 안 가요. <br>시간 약속 어기는 거, 즉흥적인 거 , 번개 약속, 내 시간 방해하는 게 세상에서 제일 싫어요!<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span<br> 일적으로 다른 사람에게 인정받는 걸 좋아해서 칭찬이 너무 좋아요.<br> 사생활을 존중해 주고, 자기 일에 성실한 사람, 배울 점이 있는 사람이 너무 좋습니다! <br>티 나게 날 챙겨주고 표현해 주는 사람! <br>하지만 나에게 너무 많은 사랑을 요구하지 않는 사람!<br>'
	 },
	  {
		name: '생각보단 행동으로 바로 실천해버리는 핵인싸 <ESTP>',
		desc: '<span class="half_HL">○ 성격은?</span> <br> 술자리, 내기, 노는 거, 스릴, 등 흥미 위주의 놀이가 좋아요!<br> 유혹에 약한 나! 즉흥적이고 자유분방해요! 생각이 단순하죠!<br> 오늘 할 일을 내일로 미루고 마지막에 폭발적으로 처리해 버리는 나!!<br> 자신감이 넘치고, 성취욕이 강해요. 쉽게 욱하고 금방 까먹어버리는 뒤끝 없는 다혈질입니다! <br>흥미 있는 것에 적극적이고, 즉흥적이지만 순발력과 임기응변의 능력이 뛰어나요! <br>눈치가 빠르고 감정을 잘 캐치해요! <br>그리고 감정을 표현하는데 필터링이 없어요!<br> 타인에 대한 선입견이 없고 개방적인 스타일입니다.<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 나를 통제하려고 하거나 독립성을 인정해 주지 않으면 화가 나요.<br> 화가 날수록 차가워지는 머리와 끓어오르는 피... <br>감성팔이 하는 사람, 은유적인 표현을 많이 하거나 <br>돌려 말하는 사람들과의 대화는 의미를 파악하기 어려워서 답답해요.<br>진지한 분위기는 싫어요!<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 변덕이 심한 사람이라 융통성 있게 나에게 맞춰줄 수 있는 사람이 좋아요!<br> 지나친 관심을 보이지 않고 외적으로 나의 스타일이면 짱! <br>자유분방하고 주변 사람들에게 관심이 많은 나라서 <br>주위에 친한 사람이 많으니 집착은 하지 말아 주세요. <br>스킨십 좋아하면... 나도 좋아요...//<br>'
	 },
	  {
		name: '외로움이 제일 싫은 눈물 많은 핵인싸 <ESFJ>',
		desc: '<span class="half_HL">○ 성격은?</span><br> 쓸데없는 걱정이 많은 스타일! <br>아직 일어나지도 않은 상황에 대해 너무 걱정해요... <br>사회생활을 잘하고 자연스럽게 분위기를 주도하거나 리더 역할을 잘해요! <br>핵인싸! 공감 능력이 너무 좋아서 상대방의 기분을 잘 맞춰준답니다. <br>낯은 잘 가리지 않지만 내 마음이 허락하기 전까지는 완벽한 자신을 보여주지 않아요. <br>말이 많고 대화하는 걸 좋아해서 고민 상담 잘해줘요! <br>상대방이 이해하기 힘들 경우 그럴수 있지 로 끝내요.<br> 부탁을 들어줄 땐 나에게 득인지 실인지 알아서 본인의 이익 챙깁니다!<br> <br><br><span class="half_HL">○ 조심해줘요!</span><br> 감정 기복이 심한 사람입니다! <br>사람을 좋아해서 내 사람들이 힘들면 나도 너무 힘들어요.. <br>티 내지 않고 묵묵하게 참는 스타일인데 만약 내가 이런 사람이 진짜 싫다고 말하는 사람은 너무 싫은 거랍니다. <br>그 사람은 아마 주변에서도 다 싫어하고 있는 사람일거예요.<br> 나는 진심으로 공감이 안 가도 그냥 공감 가는 척 할 수도 있어요!!<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 세심하게 챙겨주는 사람이 좋아요! <br>자상한 사람이 이상형인 경우 많죠!<br> 예의 바르고 부드러운 사람이 좋아요! <br>연애하면 몰입하는 스타일이라 상대의 절대적 지지자가 됩니다. <br>안정적인 관계를 좋아해요!<br>'
	 },
	  {
		name: '흥 넘치는 긍정적이고 낙천적인 에너지의 소유자 <ESFP>',
		desc: '<span class="half_HL">○ 성격은?</span><br> 사교적 긍정적 낙천적 이라는 단어가 너무 잘 어울려요!<br> 재치 있고 영리하고 개방적이면서 유행에 민감한 편이죠!<br> 귀가 얇아서.. 충동적인 경향이 있고 성격이 급한 고집쟁이랍니다.<br>거절 못 하는 우주 최강 오지라퍼! <br>하고 싶은 건 다하는 성격이라 소액결제하고 미리에 나에게 맡기는 ~~ <br>술자리는 무조건 참석!<br> 겉으로는 순종적인 척 하지만 내가 즐길 수 있는 방향으로 모두를움직여요.<br> 일은 최대한 미루다가 온 우주의 집중력을 발휘해 한 번에 끝내버려요!!<br><br> <span class="half_HL">○ 조심해줘요!</span><br> 유리 멘탈이라서 혼자 있는 걸 매우 힘들어해요.<br> 싸우는 걸 너무 싫어하는데 그렇다고 해서 싸움에 지는 건 용납할 수 없어요! <br>삐지기도 잘 삐지는 .. 하지만 금방 풀리죠!<br> 카톡이 잠잠한 건 싫어요! <br>나에게 이론 같은 설명서.. 최악이죠!<br> 조용한 분위기도 너무 어색하고 싫어요!!! <br>하기 싫은 건 죽어도 안 해요.<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 함께 시간을 많이 보내주는 사람이 좋아요!<br> 연락을 자주 한다거나 나에게 적극적으로 마음을 표현하는 사람 짱!<br> 변덕이 심하고 쉽게 질려 하니 다양한 놀이를 같이 해주는 사람!<br>'
	 },
	  {
		name: '피해주는 게 제일 싫은 열정 불도저 <ENTJ>',
		desc: '<span class="half_HL">○ 성격은?</span><br> 답답한 사람이랑 같이 일하면 그냥 혼자 총대 메고 다해버려요.<br> 끈기와 책임감이 뛰어나 맡은 일에 최선을 다해요! <br>피해 주는 거, 피해 받는 거 싫어하고 남 일에 관심이 없어요! <br>오로지 혼자 알아서!!0<br> 누구한테 의존하거나 의지하는 스타일 아닙니다!<br> 고민 상담은 감정적인 공감보다는 논리적인 해결책으로!<br> 삶이 늘 분주하고 일을 잘하며 머리가 똑똑해요! <br>그래서인지 사는 게 쉽고 내가 하기 싫은 건 죽어도 안 해요! <br>근데 정말 어쩔 수 없이 해야 한다면 최대한 힘 안 들이고 <br>빨리 끝낼 수 있는 방법을 찾아요.<br> 매사에 자신감이 넘치고 목표가 확실해 카리스마와 섹시한 사이코!<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 머리가 좋아서인지 나보다 똑똑하지 않으면 무시하 경향이... <br>타인에게 의도하고 상처 주는 경우 많아요. <br>반복되는 실수 용납하지 않아요.<br> 우유부단하고 능력 없는 고집 센 사람을 제일 싫어하고,<br> 해보지도 않았는데 못한다는 말이 너무 싫어요! <br>불도저 같은 스타일!! 비효율적 관습을 이해할 수 없어요. <br>논쟁을 좋아하고 승부욕이 강해 의견이 엇갈려도 내기해요. <br>이겨야 적성이 풀리는.. 지적은 no!<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span> <br>비전이 있고 똑똑하면서 나를 믿고 인정해주는 사람이 좋아요!<br> 매 순간 감정적인 사람은 no! <br>매력적인 이상형이 나타나면 은근 금사빠!<br>'
	  },
	  {
		name: '환불원정대, 내 갈 길 알아서 가는 마이웨이 <ENTP>',
		desc: '<span class="half_HL">○ 성격은?</span><br> 혼자서 돌아다니는 게 제일 편하고 독립심이 강한 마이웨이입니다!<br> 밖에 나가면 잘 노는데 집 안에 있는 것도 좋아해요!<br> 나한테 잘해주면 두 배로 잘해주는 데 나한테 못해주면 빠이!!<br> 좋아하는 사람과 싫어하는 사람을 명확하게 구분하고 내 마음을 표현하는 데 거리낌이 없어요. <br>그래서 그들이 날 어떻게 생각하는지도, 다른 사람 일에도 관심 없어요! <br>자기합리화랑 포기를 잘해요! <br>그래서 싸우더라도 금방 풀어요! <br>내가 하고 싶은 대로 살기 때문에 스트레스 잘 안 받죠! <br>나는 여기저기 다방면으로 관심이 많지만 뒷심과 집중력 부족으로 금방 포기해요! <br>하지만 손재주가 좋고 다 잘해요!<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 감정 기복이 심해서 기분 바뀌는 거 다 티 나요! <br>변덕이 심하고 고집이 세면서 자존심이 강력한 사람! <br>정해진 틀이나 반복적인 일을 가장 싫어하고 뭐하나 꽂히면 그것만 해요! <br>지시받는 거 극혐! 나이로 뭐라 하는 거 완전 극혐! <br>명령조 싫어!! 표정 관리할 줄 아는데, 나 너 싫어하는 티 팍팍 내고 싶어, 라는 마인드라 조심해 주세요!<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 말보다 행동으로 하는 사람이 좋아요! <br>공감도 잘해주고 계속 관심을 주는 사람! <br>대화가 잘 통하고 외적으로 나의 스타일인 사람!<br>0 이쁘고 잘생긴 거 다들 좋아하잖아요! 저도 그런 겁니다!!<br>'
	 },
	  {
		name: '사람 좋아하는 정의로운 덤벙쟁이 <ENFJ>',
		desc: '<span class="half_HL">○ 성격은?</span><br> 말로 사람을 움직이게 하는 능력이 탁월해요! <br>말을 이쁘게 하고 말로 사람을 홀리는 매력이 있어 <br>대인관계가 좋고 주변에 인기가 많으며 모두의 신뢰를 받는 나! <br>감수성이 매우 풍부해 가끔은 감정에 휘둘려 객관적 판단을 잘 못해요! <br>기분 안 좋을 때 짜증 내고 나중에 후회와 죄책감으로 시달려요. <br>귀가 매우 얇아서 맺고 끊는 거 못해요!<br> 무리에 속해 있지만 마이웨이~ <br>정이 많지만 배신 당하면 칼같이 아웃!<br>긍정적인 거 이 세상 넘버원! <br>처음 보는 사람한테 말 잘 걸어요.<br>숫자에 약한 사람.. 완벽하고 싶은 데 덤벙쟁이! <br>핵인싸고 쾌활하지 스트레스 받으면 세상 다운... <br>솔로 라이프도 연애도 즐기는 나는 워커홀릭!<br><br><span class="half_HL">○ 조심해줘요!</span><br>사람을 너무 잘 믿고 나보다 남이 먼저라 갈등 상황을 제일 싫어해요.<br>나의 의견이 비판적으로 부정당하면 대판 싸웁니다! 고집 세요!<br>분노가 치밀어 오르면 미친 듯이 화내요! 가만히 두세여!!<br>싸울 때 이성을 잃으면 팩트 폭격기<br><br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br>리액션, 눈치, 센스가 탁월한 나와 생각하는 바가 같고 똑같은 감정이길<br>바라며 대화가 잘 통하는 사람이 좋아요! 인정과 칭찬을 잘 해주는 사람!<br>먼저 다가와 주고 고마움을 잘 표현하는 사람!<br>'
	 },
	  {
		name: '감정기복 심한 활발한 소심쟁이 <ENFP>',
		desc: '<span class="half_HL">○ 성격은?</span><br> 싫고 좋은 게 감정에서 드러나요! <br>그래서 싫은 상사에게 아부 잘 못해요!<br>자유로운 영혼이라 주의가 산만하고 어디로 튈지 몰라요! <br>일 벌리고 마무리 잘 못해요! <br>누가 나서지 않으면 답답해서 나서는 스타일!<br> 친해지기 전엔 생존에 의한 인싸력이 생기지만, 친구가 생기면 찌질이로..<br> 약간 집콕러! 친구들이랑 노는 게 좋지만 내 시간도 필요해요!<br> 눈치 빠른데 하기싫으면 모른척하요! <br>표현력이 매우 풍부하고 대화하는 걸 좋아하는 나는 귀여운 매력덩어리! <br>리액션 쟁이! 나를 위해 돈을 쓰고 싶을 때 막 쓰는 프로 소비러!<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 소외되는 게 제일 싫어요! <br>남들이 보면 굉장히 인싸 같고 하지만 은근 사색도 많이 하는 생각 많은.. <br>그러니 선 넘진 말아주세요.<br> 항상 웃고 있지만 가면 뒤엔 깊은 고민들이 많아요...<br> 나는 가만히 있는 걸 싫어해요! <br>활동적인 거 할래요! 움직일래요!<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 나는 감정기복이 심해서 나를 이해해주는 사람이 좋아요!<br> 하고 싶은게 많은 나를 반대하기 보다 응원해주는 사람이 좋아요!<br> 든든하고, 믿음직 스럽고, 의지할 수 있는 사람이 짱! <br>나를 사랑하는지 늘 확인받고 싶은 나라서 늘 적극적으로 표현해주는 사람이 좋아요!<br>'
	 },
	  {
		name: '어떤 일이든 꾸준히 해내는 우등생 같은 당신 <ISTJ>',
		desc: '<span class="half_HL">○ 성격은?</span><br> 전체적으로 차분한 성격. 말이 느린 편이고 늘 신중해요.<br> 차가워 보이는 이미지인데 막상 친해지면 의외로 능글!<br> 겉으로는 무덤덤해 보여도 속으로는 혼자 생각이 너무 많아요.<br>한결같이 진지한 사람.. <br>책임감이 너무 많아서.. 장남/ 장녀같은 느낌.<br> 규칙에 엄격한 사람이라 살짝 꼰대 같은...? <br>보수적인...?<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 사람이 많은 곳을 가면 금방 지쳐요..<br> 말이 많거나 너무 시끄럽고 감정이 <br>풍부한 사람과는 맞지 않을 수도 그런 사람이 싫다는 게 아니라 그냥.. <br>안 맞는 거랍니다.<br> 즉흥적인 일은 피하는 경우가 많아요.<br> 앞뒤 다르고 약속 어기는 사람 진짜 매우 극혐.<br> 내 얘기를 하는 것도 남 얘기 들어주는 것도 힘들어요..<br> 그냥 힘들어 보이면 혼자 내버려 두세요.<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 책임감 있고 약속을 잘 지키는 사람이 좋아요!<br> 앞뒤가 똑같고 예의 바른 사람, 인성 좋은 사람이 최고!<br> 신중한 성격이라 신뢰가 가장 중요하고 <br>천천히 다가오는 사람이 좋습니다. <br>감정 표현이 약한 스타일이라 성숙한 사람이 좋아요.<br>'
	 },
	  {
		name: '과묵하면서 할일 다하는 자발적 아싸 공대생 스타일 <ISTP>',
		desc: '<span class="half_HL">○ 성격은?</span><br>남에게 관심이 별로 없어요! <br>그래서인지 선 긋기의 달인!<br>그리고 인스타는 비공개 계정인 경우가 많아요! <br>연락도 먼저 잘 안 하죠.<br>말투는 조근조근하고 간결한 말투를 사용해요. 약간 기계 느낌..?<br>손재주가 뛰어나고 기계 조작을 매우 잘하는 공대생 스타일!<br>근데 은근 활동적인 것을 좋아해요(다만 하기까지의 과정이 귀찮아)<br>꽂히는 건 무조건 해야 해요! 즉흥/충동적인 성격이라 프로 소비러!<br>아는 분야의 얘기엔 신나서 말하고 관심 없으면 쳐다보지도 않는...<br <br>  <span class="half_HL">○ 조심해줘요!</span><br>남 일에 간섭 안 해요. 그래서 나에게 간섭하면 진심으로 욕이 나와요.<br>피해 주는 것도 피해 받는 것도 너무 싫어요. <br>공감 능력이 조금.. 떨어지는..<br>그래서 누군가 나에게 찡찡거리면 싫어요! <br>시끄러운 거 질색!!<br>서론 본론 결론 으로 대화 하는 게 <br>좋아서 감정적인 사람과의 대화는 어려워요 <br>(그래서 결론이 뭐야? 뭘 말하고 싶은데?)<br><br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br>내가 좋아하는 사람은 분석하고 모르는 건 알아내려고 해요.<br>그래서 호감이 있는 상대에게는 물음표로 끝나죠. 솔직한 사람!<br>내숭 없는 사람! 부담스럽지 않은 사람! <br>친구든 이성이든 내가 먼저 좋아하면 호기심 가득! <br>관심 밖인 사람은 안중에도 없어요!<br>'
	 },
	  {
		name: '온화하고 성실하면서 서포트 잘해주는 당신 <ISFJ>',
		desc: '<span class="half_HL">○ 성격은?</span><br> 내성적인데 상황에 따라 변하는 나의 모습, 나도 날 잘 몰라..<br> 나서는 거 싫어해요! 하지만 관심은 좋아요!<br> 다른 사람의 감정을 잘 캐치하고 공감도 잘해줍니다! <br>나는 배려왕! 인간관계가 좁지만 깊어요! <br>게으른 완벽주의자!! 계획 세우는 거 좋아! 계획 대로 해야 마음이 편해요! <br>늘 기억해 둘 것은 메모하는 습관.<br> 전화가 오면 엄청 고민 후에 받아요!!<br> 무슨 재미로 사니?라고 모두들 말하지만 현재 난 매우 재밌어요!<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 쓸데없는  감정 소모가 제일 싫어요! <br>가벼운 연애할 거라면 다가오지 말아 주세요! <br>내 기준에서 벗어난 행동을 한다면 다시 보지 않아!<br> 남 부탁 거절 못 하고 나도 부탁 잘 못해요. <br>남 들을 위하는 마음이 큰 만큼 잔소리도 많아요! <br>대놓고 말 못 하고 속앓이만 하니까 주의해 주세요!<br> 아! 저에게 지나친 집중은 하지 말아 주세요!!<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 나를 편안하게 해주는 사람이 좋아요! 성실하고 똑 부러지는...!<br> 나는 무한대로 퍼주는 사람이기 때문에 나에게도 해주는 사람 짱!<br> 세심하게 작은 기념일이나 생일 등 이벤트를 꼼꼼하게 <br>챙겨주는 만큼 받는 사람 잘 표현해 주면 뿌듯하고 기분이 좋아요!<br>'
	  },
	  {
		name: '프로 집콕러이자 거절 못하는 귀차니즘 완벽주의자 <ISFP>',
		desc: '<span class="half_HL">○ 성격은?</span><br> 순둥이 그 자체! 난 안 착하다고 생각하는데 남들이 착하다고 해요.<br> 타인의 니즈를 빨리 캐치! 섬세한 부분까지도 잘 캐치! <br>하지만 말로 표현하기가 너무 어려워요. 감정 표현이 서툴... <br>나와 만나면 남들은 편안하고 안정된 느낌 이래요. <br>모든 일에 의욕이 부족하지만 한 번 삘 타면 제대로! <br>지만 미룰 수 있을 때까지 미루기!<br> 사람들 만나는 거 좋은데 싫어요. <br>집 가면 연락 두절, 조용한 관종, 낯가리는데 친해지면 <br>드립 폭발하고 은근 팩트 폭격기, 친구한테도 속마음 얘기 안 하고 쌓아둬요. <br>게으름의 끝판왕!<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 개인 시간은 필수! 개인 공간 침범하는 거 극혐.. <br>감정 기복이 심해요. 고집쟁이기 때문에 자존심 건드리지 말아 주세요. <br>얼굴 빨개지거든요. 어색한 자리는 피하고 싶어요.. <br>소리 지르면서 싸우는 거 너무 싫어요.<br> 문제나 갈등 상황이 오면 피하고 싶습니다! <br>싸우기보다는 조용히 멀어지는 스타일.. 날카로운 말에 상처받아요.<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 칭찬 잘 해주는 사람 너무 좋아요! <br>칭찬해 주면 의심부터 하지만 하루 종일 그 생각만 다.. <br>기분이 좋아요! 가치관이 비슷하고 상냥한 사람!<br> 내 행동에 잘 반응해 주고, 잘 웃어주면 행복해요! <br>마음 열기까지는 오래 걸리지만 사랑에 빠지면 연인이 우선인 나! 금사빠는 노노!<br>'
	},
	{
			name: '논리적이고 분석적인 철두철미 계획파 <INTJ>',
			desc: '<span class="half_HL">○ 성격은?</span><br> 독립적이고 분석적이며 철저한 계획을 세우는 성격입니다.<br> 장기적인 목표를 가지고 그에 맞춰 체계적으로 행동하는 걸 좋아해요.<br> 혼자만의 시간이 중요하며, 타인과의 상호작용보다는 자신의 목표에 집중해요.<br> 논리적이고 효율적인 사고를 중시하며, 무의미한 일에는 에너지를 쓰지 않으려 해요.<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 감정 표현이 서툴러 때로는 차가워 보일 수 있어요.<br> 계획에 없던 일들이 발생하면 스트레스를 받을 수 있어요.<br> 타인의 감정이나 의견에 무관심하게 보일 수 있으니 주의가 필요합니다.<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 자신의 공간을 존중해주고, 논리적이고 계획적인 사람과 잘 맞습니다.<br> 일관성 있고 성실한 태도를 가진 사람에게 매력을 느껴요.<br>'
	},
	{
			name: '독립적이고 참신한 아이디어 뱅크 <INTP>',
			desc: '<span class="half_HL">○ 성격은?</span><br> 창의적이고 독창적인 사고를 즐기는 성격입니다.<br> 새로운 아이디어를 탐구하고 복잡한 문제를 해결하는 데 강점을 가지고 있어요.<br> 감정적 대응보다는 논리와 분석을 중시하고, 독립적인 활동을 선호해요.<br> 무언가를 깊이 파고들기를 좋아하며, 고정관념을 깨는 것을 즐깁니다.<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 과도한 분석으로 결정 장애가 생길 수 있어요.<br> 감정적인 공감에 어려움을 느껴 타인과의 관계에서 소통이 부족할 수 있어요.<br> 완벽주의 성향이 강해 스스로 스트레스를 받을 수 있습니다.<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 자유로운 사고를 존중해주고, 깊이 있는 대화를 나눌 수 있는 사람과 잘 맞아요.<br> 지적이고 창의적인 대화를 통해 교감을 나누는 사람에게 매력을 느껴요.<br>'
	},
	{
			name: '친절하고 헌신적인 감성주의자 <INFJ>',
			desc: '<span class="half_HL">○ 성격은?</span><br> 배려심이 깊고 타인의 감정을 잘 이해하는 성격입니다.<br> 다른 사람을 돕고 그들의 행복을 위해 헌신하는 데 기쁨을 느껴요.<br> 이상적인 목표를 세우고 이를 실현하기 위해 끊임없이 노력합니다.<br> 조용하지만 내면에는 강한 신념과 가치관을 가지고 있어요.<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 너무 많은 배려로 인해 스스로를 희생할 수 있어요.<br> 완벽주의 성향이 강해 스트레스를 받을 수 있으며, 타인의 비판에 민감할 수 있습니다.<br> 자칫하면 타인의 문제를 자신의 문제로 인식해 감정적으로 힘들어질 수 있어요.<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 서로를 배려하고, 깊이 있는 대화를 나눌 수 있는 사람과 잘 맞습니다.<br> 진정성을 중시하고, 서로의 내면을 이해하려는 사람에게 매력을 느껴요.<br>'
	},
	{
			name: '온화하고 차분한 조력자 <ISFJ>',
			desc: '<span class="half_HL">○ 성격은?</span><br> 성실하고 신중하며 타인의 감정을 잘 돌보는 성격입니다.<br> 신뢰와 안전을 중시하며, 사람들에게 헌신하는 것을 좋아해요.<br> 조용하지만 따뜻한 마음을 가지고 있으며, 자신의 의무와 책임을 다하려고 노력합니다.<br> 타인에게 친절하고 배려심이 많아 신뢰받는 사람이에요.<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 타인의 감정을 너무 깊이 공감하다 보면 스스로를 잃을 수 있어요.<br> 변화에 대한 두려움이 커서 새로운 시도를 꺼릴 수 있습니다.<br> 자신의 감정을 솔직하게 표현하는 것이 어려울 수 있어요.<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 안정적이고 신뢰할 수 있는 사람, 그리고 감정적으로 안전한 관계를 원하는 사람과 잘 맞습니다.<br> 타인의 감정을 배려하고, 섬세한 소통을 하는 사람에게 매력을 느껴요.<br>'
	}
];

 