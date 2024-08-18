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

let currentQuestionIndex = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    document.getElementById("option1").textContent = currentQuestion.option1;
    document.getElementById("option2").textContent = currentQuestion.option2;
}

document.getElementById("option1").addEventListener("click", function() {
    handleOptionSelection(questions[currentQuestionIndex].option1);
});

document.getElementById("option2").addEventListener("click", function() {
    handleOptionSelection(questions[currentQuestionIndex].option2);
});

function handleOptionSelection(option) {
    console.log(`선택한 옵션: ${option}`);
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert("모든 질문을 완료했습니다!");
        currentQuestionIndex = 0;
        loadQuestion();
    }
}

window.onload = loadQuestion;
