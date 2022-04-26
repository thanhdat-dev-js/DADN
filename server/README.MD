# Phần BackEnd
Hiện thực Rest API để app có thể lấy dữ liệu từ server của mongoDB cũng như gọi API update io.adafruit khi cần thiết

# Cấu trúc Directory
## File ngoài
- [server.py](server.py): file chính hiện thực phần Server
- [db_config](db_config.json) + [config](config.py): cấu hình db
- [requirements.txt](requirements.txt): các thư viện python cần thiết
- [ai.py](ai.py) file chính hiện thực phần AI
- [ai_config](ai_config.json): Cách giao tiếp giữa AI từ Server
- Postman: [postman_collection](DADN.postman_collection.json)
    - Nhớ cập nhật lại variable DADNhost phù hợp với id của máy (có dạng `http://000.000.000.000:8000/`)
## Thư mục
- AI: các modules cần thiết để hiện thực AI
- factory: định dạng database và các validator
- models: chứa các models
- views: chứa các views
- venv: virtual environment của python
# Setup
> Code ở dưới được chạy trên Powershell của Window 10
## Lấy key cho adafruit
- Vào [key.template.py](key.template.py), cho return key adafruit của mình
- Đổi tên file key.template.py thành key.py

## Create virtual env
- vào thư mục server
- Run:
```
    python -m venv venv
```
để tạo virtual env trên máy của mình

- Run:
```
    .\venv\Scripts\activate (Đối với window Powershell)
```
để vào virtual env vừa tạo

- Run:
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

## Start adafruit data flow
- chạy lệnh:
```
    python .\adafruit\load.py
``` 

## Start Video Capture and AI:
- Chạy lệnh:
```
    python ai.py
```