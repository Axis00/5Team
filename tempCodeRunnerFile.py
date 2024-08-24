    # 장르에 따른 추천곡을 랜덤으로 선택
    music_list = Music.query.filter_by(genre=genre).all()
    random_music = random.choice(music_list) if music_list else None
    video_id = extract_video_id(random_music.youtube_url) if random_music else None
    
    return render_template('result.html', genre=genre, music=random_music, video_id=video_id)