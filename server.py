import http.server
import socketserver
import webbrowser
import threading

PORT = 8080
DIRECTORY = "."

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        httpd.serve_forever()

# Start the server in a separate thread
threading.Thread(target=start_server).start()

# Open the default browser to the specified file
webbrowser.open(f'http://localhost:{8080}/music.html')
