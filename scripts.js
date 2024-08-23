const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
let pos = 11;
const endPoint = 11;
const select = [0, 0, 0, 0, 0, 0, 0, 0];
var i = 0;

// 음악 취향 계산하는 함수
function calResult() {
	console.log(select);
	/*select.sort();*/

	// 큰 값 반환
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

	// 네 가지 성향 합쳐서 최종 취향 결정 후 반환
	var str_res = result1.toString() + result2.toString() + result3.toString() + result4.toString();
	return str_res;
}

// 취향별 결과 페이지로 리디렉션하는 함수
function setResult() {
	let point = calResult();

	if (point == '0246' || point == '0247' || point == '0356' || point == '1246') { pos = 0; }
	else if (point == '1357' || point == '1256' || point == '1467' || point == '1346') { pos = 1; }
	else if (point == '0346' || point == '0347' || point == '1257' || point == '1247') { pos = 2; }
	else if (point == '0257' || point == '0256' || point == '1356' || point == '0357') { pos = 3; }
	
	sessionStorage.setItem("pos", pos); // 저장

	const resultName = document.querySelector('.resultname');
	resultName.innerHTML = infoList[pos].name;
	console.log();
	
	let url;
    switch (pos) {
        case 0:
            url = `http://127.0.0.1:5500/5Team/result_ballad.html`;
            break;
        case 1:
            url = `http://127.0.0.1:5500/5Team/result_band.html`;
            break;
        case 2:
            url = `http://127.0.0.1:5500/5Team/result_dance.html`;
            break;
        case 3:
            url = `http://127.0.0.1:5500/5Team/result_hiphop.html`;
            break;
        default:
            break;
    }
	// var str = "";
	// for (var j = 0; j < 10; j++) {
	// 	str += sessionStorage.getItem("data_" + j).toString(); // 저장
	// }
	// var str1 = str.substr(0, 5);
	// var str2 = str.substr(5, 5);	
	// str1 = parseInt(str1)*3+126;
	// str2 = parseInt(str2)+2715;
	// str= String(str1)+String(str2);
	// location.href = window.location.protocol + "//" + window.location.host + '/result.html?'+point;
	location.href = url;

	/*var resultImg = document.createElement('img');
	const imgDiv = document.querySelector('#resultImg');
	var imgURL = 'image/' + point + '.png';
	resultImg.src = imgURL;
	resultImg.alt = point;
	resultImg.classList.add('img-fluid');
	imgDiv.appendChild(resultImg);*/

	const resultDesc = document.querySelector('.resultDesc');
	resultDesc.innerHTML = infoList[pos].desc;
}
	// 마지막 질문에서 결과 페이지로 이동하기 위해 setResult() 호출
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
	
	// 답변 버튼 생성, 다음 질문으로 이동하는 함수
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
	
	// 다음 질문으로 이동하는 함수, 마지막 질문이면 goResult()로 이동
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
	
		currentQuestionIndex = qIdx; // 현재 질문 인덱스 업데이트
		loadQuestion(); // 질문과 이미지 로드
	}
	
	function loadQuestion() {
		const currentQuestion = qnaList[currentQuestionIndex];
		document.querySelector(".qBox").textContent = currentQuestion.q;
		
		// 이미지 설정
		const questionImage = document.getElementById("questionImage");
		const imageUrl = currentQuestion.img;
		
		if (imageUrl) {
			questionImage.src = imageUrl;
			questionImage.style.display = "block";
		} else {
			questionImage.style.display = "none";
		}
		
		// 답변 버튼 생성
		const answerBox = document.querySelector(".answerBox");
		answerBox.innerHTML = ''; // 기존 버튼 제거
		for (let i in currentQuestion.a) {
			addAnswer(currentQuestion.a[i].answer, currentQuestionIndex, i);
		}
		
		// 상태 바 업데이트
		const statusBar = document.querySelector(".statusBar");
		statusBar.style.width = (100 / endPoint) * (currentQuestionIndex + 1) + '%';
	}
	
	
	// 처음 시작하는 함수
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

	// 질문 and 선택지
const qnaList = [

	{
		q: '1. 썸타는 사람과 노래방에 갔다. 마지막 곡은?',
		img: 'https://img2.quasarzone.co.kr/img/data/img/editor/1901/1901___1441657643.jpg',
		a: [
			{ answer: '내가 가장 자신있는 감성적인 발라드를 부른다.', type: [0, 2, 4, 6] },
			{ answer: '이제 슬슬 분위기가 물올랐어, 같이 즐길 수 있는 노래를 부른다.', type: [1, 3, 5, 7] } 
		]
	},
	{
		q: '2. 부모님과 노래방을 갔다. 당신의 선곡은? ',
		img: 'https://storage.enuri.info/pic_upload/knowbox2/06110565020180221b04978b3-f080-423a-bb40-90ea71c432b8.jpg',
		a: [
			{ answer: '부모님이 잘 아실법한 트로트를 부른다.', type: [1, 3, 5, 7] },
			{ answer: '부모님에게 트렌드를 알려줄 요즘 노래를 부른다.', type: [1, 3, 5, 7] }
		]
	},
	{
		q: '3. 절친의 결혼식에 축가를 부르게 되었다. 당신의 선곡은? ',
		img: 'https://t2.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/aZWV/image/K7YGZ01YOZoN4ALZjbHZfxyDOq0.jpg',
		a: [
			{ answer: '최선을 다해 발라드를 불러 친구를 감동시킨다. ', type: [0, 2, 4, 6] },
			{ answer: '결혼식은 기쁜날이다. 신나는 노래를 불러 이 자리를 축제의 장으로 만든다.', type: [1, 3, 5, 7] }
		]
	},
	{
		q: '4. 늦은 밤 혼자 한강 산책을 나섰다. 그때 내가 들을 노래는? ',
		img: 'https://img.freepik.com/photos-premium/king-throne-illustration-image-generative-ai_800563-7624.jpg',
		a: [
			{ answer: '댄스 음악 박자에 맞춰 걷는다.', type: [1, 3, 5, 6] },
			{ answer: '새벽 감성이 올라온다. 전 애인과 즐겨들었던 노래를 들으며 그녀를 추억한다.', type: [0, 2, 4, 6] }
		]
	},
	{
		q: '5. 오늘은 나의 왕 즉위식이다. 내가 등장할 때 틀 배경음악은?',
		img : 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.crowdpic.net%2Fdetail-thumb%2Fthumb_d_C96https://img.freepik.com/photos-premium/king-throne-illustration-image-generative-ai_800563-7624.jpg635080296322668EC8E84CAF0B1C4.jpg&type=sc960_832',
		a: [
			{ answer: '세상에서 가장 웅장한 음악을 튼다.', type: [0, 2, 5, 7] },
			{ answer: '왕이 되는 이 기분을 숨겨왔던 나의 댄스 실력으로 보여준다.', type: [1, 3, 5, 7] }
		]
	},
	{
		q: '6. 오늘은 친했던 친구가 죽은지 1년이 다 되어가는날.. 무슨 노래로 이 기분을 달랠까? ',
		img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F109%2F2017%2F05%2F09%2F0003532881_006_20170509105114141.jpg&type=sc960_832',
		a: [
			{ answer: '친구가 좋아했던 힙합을 들으며 친구를 추억한다.', type: [1, 3, 4, 7] },
			{ answer: '슬픈 노래를 들으면서 친구를 기억하며 눈물을 흘린다.', type: [0, 2, 4, 6] },
		]
	},
	{
		q: '7. 오늘 직장상사에게 혼났다. 내 기분을 달랠 음악은?',
		img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MDNfMTcg%2FMDAxNjkzNzE2OTgwNDMw.6rDpcZvu--iIgtkAsTMwtGaAis0JmkTIqA6JQaOq_Jcg.b4vC7WHzqNgswJS1X8BrK3ql9K4QEuV944O78tyh-Hgg.PNG.iser777a%2FIMG_4655.png&type=sc960_832',
		a: [
			{ answer: '스트레스를 풀 때는 고음만 한 게 없지. 소찬휘의 Tears를 부른다. ', type: [1, 3, 4, 7] },
			{ answer: '댄스 음악을 들으며 춤을 추면서 나는 이런 사람이라는 것을 일깨운다. ', type: [1, 3, 5, 7] }
		]
	},
	{
		q: '8. 친구들에게 1년 전부터 괴롭힘을 당하고 있다. 집에 가서 나를 위로해 주는 것은?',
		img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20140526_37%2Fntm55_1401031145685a7ruP_PNG%2F-739393247.png&type=sc960_832',
		a: [
			{ answer: '슬픈 발라드를 들으며 나를 위로한다.', type: [0, 2, 4, 6] },
			{ answer: '나를 위로해주는건 오직 jpop!', type: [1, 3, 5, 6] }
		]
	},

	{
		q: '9. 운동을 하러온 나를 위해',
		img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20091104_44%2Fdlsrbdnwjd_1257340505132fKDqU_jpg%2F222_elayts_dlsrbdnwjd.jpg&type=sc960_832',
		a: [
			{ answer: '운동에 집중할 수 있는 서정적인 노래', type: [0, 2, 4, 6] },
			{ answer: '나에게 힘을 불어넣어 주는 걸그룹 노래', type: [1, 3, 5, 7] }
		]
	},
	{
		q: '10. 동성친구와 스키장을 가게 되었다. 입장할 때 나를 반겨주는 음악은?',
		img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA5MjdfNzMg%2FMDAxNTA2NDkwNTE4NDY5.Urxp4Nrsj5Wlh_k1uWtbVIunF7n3YOASlwa4xXk71Qcg.eCwqosRNxSi2Fof5BvPfL8PbFCJIIIqt1dKesjJrXigg.GIF.wo09765%2F%25C2%25A9.gif&type=sc960_832_gif',
		a: [
			{ answer: '설레는 계절, 캐롤과 함께 스키를 즐긴다.', type: [1, 3, 4, 6] },
			{ answer: '주변이 죄다 커플.. 쓸쓸함을 발라드로 달랜다.', type: [0, 2, 4, 6] }
		]
	},
	{
		q: '11. 내 최애 콘서트를 가게 되었다. 당신의 가슴을 뛰게 할 노래는? ',
		img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20151123_23%2Fponponkarin_1448220578431jm1Fm_JPEG%2FNaverBlog_20151123_042938_39.jpg&type=sc960_832',
		a: [
			{ answer: '고막이 사르르 녹는 노래', type: [0, 2, 4, 6] },
			{ answer: '낭만 넘치는 밴드', type: [1, 3, 5, 6] }
		]
	}
]

 // 최종 음악 취향
const infoList = [
	{
	name: '발라드, RnB',
	 desc: '<span class="half_HL">○ 성격은?</span><br> 고집이 세고 현실적인 사람입니다! 호불호가 매우 확실해요!<br> 리더 하는 거 너무싫은데 막상 하면 잘하죠! 일처리는 똑 부러지게!<br> 이것저것 배우길 좋아하는 머리 좋은 똑똑이인 나는 눈치가 빠르고 말을 잘해요! 호기심 갑! 지적 욕구도 갑! <br>겉과 속이 일치한 사람이라 차라리 앞 담을 하지 앞에서 못할 얘기는 뒤에서도 안 해요!! 과정보다는 결과가 중요하죠! 완전 워커 홀릭! <br>감정적이기보다 상황 분석 후 누가 잘못했는지 객관적 판단을 해요. <br>하지만 생각만 하지 입 밖으로 내뱉지는 않아요! 사전 계획 철저하지만 융통성 제로!<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 남이 일을 못하면 너무 답답해서 잔소리가 심해져요. 일 잘하는 사람은 좋은 사람, 일 못하는 사람은 나쁜 사람! <br>위로 잘 못해요... 외로움을 잘 못 느끼는 편이라 외로워하는 사람이 이해 안 가요. <br>시간 약속 어기는 거, 즉흥적인 거 , 번개 약속, 내 시간 방해하는 게 세상에서 제일 싫어요!<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span<br> 일적으로 다른 사람에게 인정받는 걸 좋아해서 칭찬이 너무 좋아요.<br> 사생활을 존중해 주고, 자기 일에 성실한 사람, 배울 점이 있는 사람이 너무 좋습니다! <br>티 나게 날 챙겨주고 표현해 주는 사람! <br>하지만 나에게 너무 많은 사랑을 요구하지 않는 사람!<br>'
		},
		 {
		 name: '댄스',
		 desc: '<span class="half_HL">○ 성격은?</span> <br> 술자리, 내기, 노는 거, 스릴, 등 흥미 위주의 놀이가 좋아요!<br> 유혹에 약한 나! 즉흥적이고 자유분방해요! 생각이 단순하죠!<br> 오늘 할 일을 내일로 미루고 마지막에 폭발적으로 처리해 버리는 나!!<br> 자신감이 넘치고, 성취욕이 강해요. 쉽게 욱하고 금방 까먹어버리는 뒤끝 없는 다혈질입니다! <br>흥미 있는 것에 적극적이고, 즉흥적이지만 순발력과 임기응변의 능력이 뛰어나요! <br>눈치가 빠르고 감정을 잘 캐치해요! <br>그리고 감정을 표현하는데 필터링이 없어요!<br> 타인에 대한 선입견이 없고 개방적인 스타일입니다.<br> <br><span class="half_HL">○ 조심해줘요!</span><br> 나를 통제하려고 하거나 독립성을 인정해 주지 않으면 화가 나요.<br> 화가 날수록 차가워지는 머리와 끓어오르는 피... <br>감성팔이 하는 사람, 은유적인 표현을 많이 하거나 <br>돌려 말하는 사람들과의 대화는 의미를 파악하기 어려워서 답답해요.<br>진지한 분위기는 싫어요!<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 변덕이 심한 사람이라 융통성 있게 나에게 맞춰줄 수 있는 사람이 좋아요!<br> 지나친 관심을 보이지 않고 외적으로 나의 스타일이면 짱! <br>자유분방하고 주변 사람들에게 관심이 많은 나라서 <br>주위에 친한 사람이 많으니 집착은 하지 말아 주세요. <br>스킨십 좋아하면... 나도 좋아요...//<br>'
		},
		 {
		 name: '힙합',
		 desc: '<span class="half_HL">○ 성격은?</span><br> 쓸데없는 걱정이 많은 스타일! <br>아직 일어나지도 않은 상황에 대해 너무 걱정해요... <br>사회생활을 잘하고 자연스럽게 분위기를 주도하거나 리더 역할을 잘해요! <br>핵인싸! 공감 능력이 너무 좋아서 상대방의 기분을 잘 맞춰준답니다. <br>낯은 잘 가리지 않지만 내 마음이 허락하기 전까지는 완벽한 자신을 보여주지 않아요. <br>말이 많고 대화하는 걸 좋아해서 고민 상담 잘해줘요! <br>상대방이 이해하기 힘들 경우 그럴수 있지 로 끝내요.<br> 부탁을 들어줄 땐 나에게 득인지 실인지 알아서 본인의 이익 챙깁니다!<br> <br><br><span class="half_HL">○ 조심해줘요!</span><br> 감정 기복이 심한 사람입니다! <br>사람을 좋아해서 내 사람들이 힘들면 나도 너무 힘들어요.. <br>티 내지 않고 묵묵하게 참는 스타일인데 만약 내가 이런 사람이 진짜 싫다고 말하는 사람은 너무 싫은 거랍니다. <br>그 사람은 아마 주변에서도 다 싫어하고 있는 사람일거예요.<br> 나는 진심으로 공감이 안 가도 그냥 공감 가는 척 할 수도 있어요!!<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 세심하게 챙겨주는 사람이 좋아요! <br>자상한 사람이 이상형인 경우 많죠!<br> 예의 바르고 부드러운 사람이 좋아요! <br>연애하면 몰입하는 스타일이라 상대의 절대적 지지자가 됩니다. <br>안정적인 관계를 좋아해요!<br>'
		},
		 {
		 name: '밴드, 락',
		 desc: '<span class="half_HL">○ 성격은?</span><br> 사교적 긍정적 낙천적 이라는 단어가 너무 잘 어울려요!<br> 재치 있고 영리하고 개방적이면서 유행에 민감한 편이죠!<br> 귀가 얇아서.. 충동적인 경향이 있고 성격이 급한 고집쟁이랍니다.<br>거절 못 하는 우주 최강 오지라퍼! <br>하고 싶은 건 다하는 성격이라 소액결제하고 미리에 나에게 맡기는 ~~ <br>술자리는 무조건 참석!<br> 겉으로는 순종적인 척 하지만 내가 즐길 수 있는 방향으로 모두를움직여요.<br> 일은 최대한 미루다가 온 우주의 집중력을 발휘해 한 번에 끝내버려요!!<br><br> <span class="half_HL">○ 조심해줘요!</span><br> 유리 멘탈이라서 혼자 있는 걸 매우 힘들어해요.<br> 싸우는 걸 너무 싫어하는데 그렇다고 해서 싸움에 지는 건 용납할 수 없어요! <br>삐지기도 잘 삐지는 .. 하지만 금방 풀리죠!<br> 카톡이 잠잠한 건 싫어요! <br>나에게 이론 같은 설명서.. 최악이죠!<br> 조용한 분위기도 너무 어색하고 싫어요!!! <br>하기 싫은 건 죽어도 안 해요.<br> <br><span class="half_HL">○ 이런 사람이랑 잘 맞아요!</span><br> 함께 시간을 많이 보내주는 사람이 좋아요!<br> 연락을 자주 한다거나 나에게 적극적으로 마음을 표현하는 사람 짱!<br> 변덕이 심하고 쉽게 질려 하니 다양한 놀이를 같이 해주는 사람!<br>'
		}
 ]