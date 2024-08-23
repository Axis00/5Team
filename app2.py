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

# 노래 제목과 아티스트 이름으로 YouTube URL 검색
def find_youtube_url(title, artist):
    query = f"{title} {artist} official"
    search = Search(query)
    if search.results:
        return search.results[0].watch_url
    return None

# 유튜브 URL에서 비디오 ID 추출
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

# 엑셀 파일에서 데이터를 읽어와 데이터베이스에 추가
def load_data_from_excel(file_path):
    df = pd.read_excel(file_path)
    for _, row in df.iterrows():
        music = Music(
            title=row['제목'],
            artist=row['아티스트'],
            genre=row['장르'],
            youtube_url=row['유튜브url']
        )
        db.session.add(music)
    db.session.commit()

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
def upload_excel():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if file and file.filename.endswith('.xlsx'):
        file_path = 'temp.xlsx'
        file.save(file_path)
        load_data_from_excel(file_path)
        os.remove(file_path)  # 사용 후 임시 파일 삭제
        return jsonify({'message': 'Data loaded successfully!'}), 200
    else:
        return jsonify({'message': 'Invalid file format!'}), 400

if __name__ == '__main__':
    app.run(debug=True)
