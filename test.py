from flask import Flask #간단히 플라스크 서버를 만든다

import urllib.request

app = Flask(__name__)

@app.route("/tospring")
def spring():
    
    return "test"
    
    
if __name__ == '__main__':
    app.run(debug=False,host="127.0.0.1",port=5000)