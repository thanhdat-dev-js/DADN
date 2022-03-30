# Intro
Đây là Rest API để app có thể lấy dữ liệu từ server của mongoDB

# Cấu trúc Directory
## File ngoài
- server.py: file chạy chính
- db_config.json + config.py: cấu hình db
- requirement.txt: các thư viện python cần thiết
## Thư mục
- factory: định dạng database và các validator
- models: chứa các models
- views: chứa các views
- venv: virtual environment của python

# Setup
- vào thư mục server
- Run:
```
    python -m venv venv
```
để tạo virtual env trên máy của mình

- Run
```
    venv\Script\active
```
để vào virtual env vừa tạo

- Run
```
    pip install -r requirements.txt
```

- Cuối cùng chạy lệnh:
```
    python server.py
```
Để chạy server trên máy