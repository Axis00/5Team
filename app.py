from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from pytube import Search
import random
from urllib.parse import urlparse, parse_qs
import pandas as pd
import os


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///music.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# 음악 DB 모델 정의
class Music(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    artist = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50), nullable=False)  # 장르 추가
    youtube_url = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'<Music {self.title} by {self.artist} in {self.genre}>'
    
# Flask-Admin 설정
admin = Admin(app, name='MusicDB Admin', template_mode='bootstrap3')
admin.add_view(ModelView(Music, db.session))

# 데이터베이스 생성
with app.app_context():
    db.create_all()

#노래 제목과 아티스트 이름으로 YouTube URL 검색
def find_youtube_url(title, artist):
    query = f"{title} {artist} official"
    search = Search(query)
    if search.results:
        return search.results[0].watch_url
    return None

#유튜브 URL에서 비디오 ID 추출
def extract_video_id(youtube_url):
    parsed_url = urlparse(youtube_url)
    if parsed_url.hostname == 'youtu.be':
        return parsed_url.path[1:]
    elif parsed_url.hostname in ('www.youtube.com', 'youtube.com'):
        if parsed_url.path == '/watch':
            return parse_qs(parsed_url.query).get('v', [None])[0]
        elif parsed_url.path.startswith('/embed/'):
            return parsed_url.path.split('/')[2]
        elif parsed_url.path.startswith('/v/'):
            return parsed_url.path.split('/')[2]
    return None


# 랜덤 추천 기능
@app.route('/recommend')
def recommend():
    all_music = Music.query.all()
    if all_music:
        random_music = random.choice(all_music)
        video_id = extract_video_id(random_music.youtube_url)
        if video_id:
            return render_template('recommend.html', music=random_music, video_id=video_id)
        else:
            return "Invalid YouTube URL.", 400
    else:
        return "No music found in the database.", 404
    
# 엑셀 파일 업로드 기능
@app.route('/import')
def import_data():
    try:
        df = pd.read_excel('music_data.xlsx')
        for index, row in df.iterrows():
            new_music = Music(genre=row['Genre'], title=row['Title'], artist=row['Artist'], youtube_url=row['YouTube URL'])
            db.session.add(new_music)
        db.session.commit()
        return "Data imported from music_data.xlsx"
    except Exception as e:
        return f"An error occurred: {e}"
    
# 장르별 랜덤 음악 가져오기
@app.route('/get_random_music')
def get_random_music():
    genre = request.args.get('genre')
    music = Music.query.filter_by(genre=genre).all()
    if music:
        random_music = random.choice(music)
        video_id = extract_video_id(random_music.youtube_url)
        return jsonify({'title': random_music.title, 'artist': random_music.artist, 'youtube_id': video_id})
    else:
        return jsonify({'error': 'No music found for the selected genre'}), 404

#결과 페이지
@app.route('/result', methods=['GET', 'POST'])
def result():
    if request.method == 'POST':
        title = request.form.get('title')
        artist = request.form.get('artist')
        youtube_url = request.form.get('youtube_url')
        genre = request.form.get('genre')

        if not title or not artist or not genre:
            return "Title, Artist, and Genre are required.", 400

        # 유튜브 URL이 없으면 자동으로 검색
        if not youtube_url:
            youtube_url = find_youtube_url(title, artist)

        # 음악 데이터베이스에 저장
        if youtube_url:
            new_music = Music(title=title, artist=artist, youtube_url=youtube_url, genre=genre)
            db.session.add(new_music)
            db.session.commit()

            message = f"'{title}' by '{artist}' has been added successfully!"
        else:
            message = "YouTube URL not found. Please try again or provide the URL manually."
            return render_template('result.html', genre=genre, music=None, video_id=None, message=message)

        # 기존의 추천곡 표시
        # music_list = Music.query.filter_by(genre=genre).all()
        # random_music = random.choice(music_list) if music_list else None
        # video_id = extract_video_id(random_music.youtube_url) if random_music else None

        return render_template('result.html', genre=genre, music=random_music, video_id=video_id, message=message)

    else:
        # GET 요청의 경우
        pos = request.args.get('pos', default=None, type=int)  # sessionStorage의 pos 값을 쿼리 파라미터로 전달
        if pos is None:
            return "Invalid request: 'pos' is required.", 400

        genre_map = {0: "Ballad", 1: "Rock", 2: "Dance", 3: "Hip-hop"}
        try:
            genre = genre_map[int(pos)]
        except (ValueError, KeyError):
            return "Invalid 'pos' value.", 400

        # 장르에 따른 추천곡을 랜덤으로 선택
        music_list = Music.query.filter_by(genre=genre).all()
        random_music = random.choice(music_list) if music_list else None
        video_id = extract_video_id(random_music.youtube_url) if random_music else None

        return render_template('result.html', genre=genre, music=random_music, video_id=video_id)

# 홈 페이지 및 음악 추가 기능
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        title = request.form['title']
        artist = request.form['artist']
        genre = request.form['genre']  # 장르 입력받기
        youtube_url = request.form['youtube_url']
        
        # 사용자가 유튜브 URL을 입력하지 않은 경우, 검색
        if not youtube_url:
            youtube_url = find_youtube_url(title, artist)
        
        if youtube_url:
            # 새로운 음악 데이터베이스에 저장
            new_music = Music(title=title, artist=artist, genre=genre, youtube_url=youtube_url)  # 장르 포함
            db.session.add(new_music)
            db.session.commit()
            message = f"'{title}' by '{artist}' in genre '{genre}' has been added successfully!"
        else:
            message = "YouTube URL not found. Please try again or provide the URL manually."
            return render_template('index.html', music_list=Music.query.all(), message=message)
        
        return redirect(url_for('index'))
    
    # 저장된 모든 음악 리스트를 가져옴
    all_music = Music.query.all()
    return render_template('index.html', music_list=all_music)

# 메인 페이지
@app.route('/main', methods=['GET', 'POST'])
def main():
    return render_template('main.html')




if __name__ == '__main__':
    app.run(debug=True)
