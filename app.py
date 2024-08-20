from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from pytube import Search
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///music.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# 음악 모델 정의
class Music(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    artist = db.Column(db.String(100), nullable=False)
    youtube_url = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'<Music {self.title} by {self.artist}>'
    
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

# 홈 페이지 및 음악 추가 기능
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        title = request.form['title']
        artist = request.form['artist']
        youtube_url = request.form['youtube_url']
        
        # 새로운 음악 데이터베이스에 저장
        # 사용자가 유튜브 URL을 입력하지 않은 경우, 검색
        if not youtube_url:
            youtube_url = find_youtube_url(title, artist)
        
        if youtube_url:
            # 새로운 음악 데이터베이스에 저장
            new_music = Music(title=title, artist=artist, youtube_url=youtube_url)
            db.session.add(new_music)
            db.session.commit()
        else:
            return "YouTube URL not found", 404
        
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
        return render_template('recommend.html', music=random_music)
    else:
        return "No music found in the database.", 404

if __name__ == '__main__':
    app.run(debug=True)
