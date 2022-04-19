# Intro
Đây là Rest API để app có thể lấy dữ liệu từ server của mongoDB

# Cấu trúc Directory
## File ngoài
- [server.py](server.py): file chạy chính
- [db_config](db_config.json) + [config](config.py): cấu hình db
- [requirements.txt](requirements.txt): các thư viện python cần thiết
- Postman: [postman_collection](DADN.postman_collection.json)
    - Nhớ cập nhật lại variable DADNhost phù hợp với id của máy (có dạng `http://000.000.000.000:8000/`)
## Thư mục
- factory: định dạng database và các validator
- models: chứa các models
- views: chứa các views
- venv: virtual environment của python

# Setup
## Lấy key cho adafruit
- Vào [key.template.py](key.template.py), cho returnkey adafruit của mình
- Đổi tên file key.template.py thành key.py

## Create virtual env
- vào thư mục server
- Run:
```
    python -m venv venv
```
để tạo virtual env trên máy của mình

- Run
```
    .\venv\Scripts\activate (Đối với window Powershell)
```
để vào virtual env vừa tạo

- Run
```
    pip install -r requirements.txt
```
Để cài đặt các module cần thiết

## Start server
- Cuối cùng chạy lệnh:
```
    python server.py
```
Để chạy server trên máy