import sys
from upload_app import upload_app

host = sys.argv[1]
username = sys.argv[2]
password = sys.argv[3]
host_key = sys.argv[4]

upload_app(host=host, username=username, password=password, host_key=host_key)
