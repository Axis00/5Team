/*
const questions = [
    { question: "썸남(녀)와 노래방에 갔다, 마지막곡은?", option1: "내가 가장 자신있는 감성적인 발라드를 부른다.", option2: "이제 슬슬 분위기가 물올랐어, 썸남(녀)와 같이 즐길 수 있는 노래를 부른다." },
    { question: "부모님과 노래방을 갔다", option1: "부모님이 잘 아실법한 트로트를 부른다.", option2: "내가 부모님에게 트렌드를 알려줄 요즘노래를 부른다." },
    { question: "절친의 결혼식에 축가를 부르게 되었다.", option1: "최선을 다해 불러서 친구를 감동먹일 발라드를 부른다.", option2: "결혼식은 기쁜날이다. 신나는 노래를 불러 이 자리를 축제의 장으로 만든다." },
    { question: "늦은 밤 혼자 한강에 산책을 나왔다.", option1: "댄스 음악 박자에 맞춰 걷는다.", option2: "새벽 감성이 올라온다. 전애인과 즐겨들었던 노래를 들으며 그녀를 추억한다." },
    { question: "오늘은 나의 왕 취임식이다. 내가 등장할때 깔고싶은 배경음악은?", option1: "세상에서 가장 웅장한 음악을 튼다.", option2: "왕이되는 이 기분을 숨겨왔던 나의 댄스실력으로 보여준다" },
    { question: "오늘은 친했던 친구가 죽은지 1년이 다 되어가는날..", option1: "친구가 좋아했던 노래를 들으며 그(녀)를 추억한다.", option2: "슬픈 노래를 들으면서 친구를 기억하며 눈물을 흘린다." },
    { question: "오늘 직장상사에게 혼났다, 이때 듣고싶은 음악은?", option1: "스트레스를 풀때는 고음만한게 없지", option2: "댄스음악을 들으며 춤을추면서 밖에서 나는 이런사람이다 라는 것을 일깨운다." },
    { question: "친구들에게 1년전 부터 괴롭힘을 당하고있다. 집에가서 나를 위로해주는 것은?", option1: "슬픈 발라드를 들으며 나를 위로해준다.", option2: "나를 위로해주는건 오직 jpop!" },
    { question: "운동을 하러온 나를 위해", option1: "운동에 집중할 수있는 서정적인 노래", option2: "나에게 힘을 불어넣어주는 강렬한노래" },
    { question: "동성친구와 스키장을 가게되었다. 입장할때 나를 반겨주는 음악은?", option1: "설레는 계절,캐롤과 함께 스키를 즐긴다.", option2: "주변이 죄다 커플.. 쓸쓸함을 발라드로 달랜다." },
    { question: "콘서트를 가게되었다.", option1: "고막이 사르르녹는 노래", option2: "낭만 넘치는 밴드" }
];
*/
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
let pos = 11;
const endPoint = 11;
const select = [0, 0, 0, 0, 0, 0, 0, 0];

const questions = [

	{
		question: '1. 썸타는 사람과 노래방에 갔다. 마지막 곡은?',
		a: [
			{ option1: '내가 가장 자신있는 감성적인 발라드를 부른다.', type: [0] },
			{ option2: '이제 슬슬 분위기가 물올랐어, 같이 즐길 수 있는 노래를 부른다.', type: [1] }
		]
	},
	{
		question: '2. 부모님과 노래방을 갔다. 당신의 선곡은? ',
		a: [
			{ option1: '부모님이 잘 아실법한 트로트를 부른다.', type: [0] },
			{ option2: '부모님에게 트렌드를 알려줄 요즘 노래를 부른다.', type: [1] }
		]
	},
	{
		question: '3. 절친의 결혼식에 축가를 부르게 되었다. 당신의 선곡은? ',
		a: [
			{ option1: '최선을 다해 발라드를 불러 친구를 감동시킨다. ', type: [2] },
			{ option2: '결혼식은 기쁜날이다. 신나는 노래를 불러 이 자리를 축제의 장으로 만든다.', type: [3] }
		]
	},
	{
		question: '4. 늦은 밤 혼자 한강 산책을 나섰다. 그때 내가 들을 노래는? ',
		a: [
			{ option1: '댄스 음악 박자에 맞춰 걷는다.', type: [0] },
			{ option2: '새벽 감성이 올라온다. 전 애인과 즐겨들었던 노래를 들으며 그녀를 추억한다.', type: [1] }
		]
	},
	{
		question: '5. 오늘은 나의 왕 즉위식이다. 내가 등장할 때 틀 배경음악은?',
		a: [
			{ option1: '세상에서 가장 웅장한 음악을 튼다.', type: [5] },
			{ option2: '왕이 되는 이 기분을 숨겨왔던 나의 댄스 실력으로 보여준다.', type: [4] }
		]
	},
	{
		question: '6. 오늘은 친했던 친구가 죽은지 1년이 다 되어가는날.. 무슨 노래로 이 기분을 달랠까? ',
		a: [
			{ option1: '친구가 좋아했던 노래를 들으며 친구를 추억한다.', type: [3] },
			{ option2: '슬픈 노래를 들으면서 친구를 기억하며 눈물을 흘린다.', type: [2] },
		]
	},
	{
		question: '7. 오늘 직장상사에게 혼났다. 내 기분을 달랠 음악은?',
		a: [
			{ option1: '스트레스를 풀 때는 고음만 한 게 없지. ', type: [7] },
			{ option2: '댄스음악을 들으며 춤을 추면서 나는 이런 사람이라는 것을 일깨운다. ', type: [6] }
		]
	},
	{
		question: '8. 친구들에게 1년 전부터 괴롭힘을 당하고 있다. 집에 가서 나를 위로해 주는 것은?',
		a: [
			{ option1: '슬픈 발라드를 들으며 나를 위로한다.', type: [4] },
			{ option2: '나를 위로해주는건 오직 jpop!', type: [5] }
		]
	},

	{
		question: '9. 운동을 하러온 나를 위해',
		a: [
			{ option1: '운동에 집중할 수 있는 서정적인 노래', type: [5] },
			{ option2: '나에게 힘을 불어넣어 주는 강렬한 노래', type: [4] }
		]
	},
	{
		question: '10. 동성친구와 스키장을 가게 되었다. 입장할 때 나를 반겨주는 음악은?',
		a: [
			{ option1: '설레는 계절, 캐롤과 함께 스키를 즐긴다.', type: [6] },
			{ option2: '주변이 죄다 커플.. 쓸쓸함을 발라드로 달랜다.', type: [7] }
		]
	},
	{
		question: '11. 내 최애 콘서트를 가게 되었다. 당신의 가슴을 뛰게 할 노래는? ',
		a: [
			{ option1: '고막이 사르르 녹는 노래', type: [2] },
			{ option2: '낭만 넘치는 밴드', type: [3] }
		]
	},
]

const imageUrls = [
    "https://img2.quasarzone.co.kr/img/data/img/editor/1901/1901___1441657643.jpg",
    "https://storage.enuri.info/pic_upload/knowbox2/06110565020180221b04978b3-f080-423a-bb40-90ea71c432b8.jpg",
    "https://t2.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/aZWV/image/K7YGZ01YOZoN4ALZjbHZfxyDOq0.jpg",
    "https://img.freepik.com/photos-premium/king-throne-illustration-image-generative-ai_800563-7624.jpg",
    "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.crowdpic.net%2Fdetail-thumb%2Fthumb_d_C96635080296322668EC8E84CAF0B1C4.jpg&type=sc960_832",
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F109%2F2017%2F05%2F09%2F0003532881_006_20170509105114141.jpg&type=sc960_832",
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MDNfMTcg%2FMDAxNjkzNzE2OTgwNDMw.6rDpcZvu--iIgtkAsTMwtGaAis0JmkTIqA6JQaOq_Jcg.b4vC7WHzqNgswJS1X8BrK3ql9K4QEuV944O78tyh-Hgg.PNG.iser777a%2FIMG_4655.png&type=sc960_832",
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20140526_37%2Fntm55_1401031145685a7ruP_PNG%2F-739393247.png&type=sc960_832",
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20091104_44%2Fdlsrbdnwjd_1257340505132fKDqU_jpg%2F222_elayts_dlsrbdnwjd.jpg&type=sc960_832",
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA5MjdfNzMg%2FMDAxNTA2NDkwNTE4NDY5.Urxp4Nrsj5Wlh_k1uWtbVIunF7n3YOASlwa4xXk71Qcg.eCwqosRNxSi2Fof5BvPfL8PbFCJIIIqt1dKesjJrXigg.GIF.wo09765%2F%25C2%25A9.gif&type=sc960_832_gif",
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20151123_23%2Fponponkarin_1448220578431jm1Fm_JPEG%2FNaverBlog_20151123_042938_39.jpg&type=sc960_832"
];

let currentQuestionIndex = 0;
const scores = { option1: 0, option2: 0 };

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    // 질문 텍스트 설정
    document.getElementById("question").textContent = currentQuestion.question;
    
    // 옵션 버튼 텍스트 설정
    document.getElementById("option1").textContent = currentQuestion.a[0].option1;
    document.getElementById("option2").textContent = currentQuestion.a[1].option2;
    
    // 이미지 설정
    const imageUrl = imageUrls[currentQuestionIndex % imageUrls.length];
    const displayedImage = document.getElementById("displayedImage");

    if (imageUrl) {
        displayedImage.src = imageUrl;
        displayedImage.style.display = "block";
    } else {
        displayedImage.style.display = "none";
    }
}


function handleOptionSelection(option) {
    scores[option]++;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        displayResult();
    }
}


document.getElementById("option1").addEventListener("click", function() {
    handleOptionSelection('option1');
});

document.getElementById("option2").addEventListener("click", function() {
    handleOptionSelection('option2');
});

// 초기 질문 로드
window.onload = function() {
    loadQuestion();
};


function calResult() {
	console.log(select);


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

	const resultName = document.querySelector('.result2name');
	resultName.innerHTML = infoList[pos].name;
	console.log();

	location.href = `http://localhost:8080/result2.html?point=${point}`;

	const resultDesc = document.querySelector('.result2Desc');
	resultDesc.innerHTML = infoList[pos].desc;
}
function goResult() {

    setResult();
}