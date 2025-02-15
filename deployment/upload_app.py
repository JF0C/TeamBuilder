import pysftp
from time import *

remote_base_directory = "/wwwroot/"
local_base_directory = "../"
maintenance_page_file = "app_offline.htm"
build_output_directory = "TeamBuilder/bin/Release/net8.0/publish/"

known_hosts_filename = "./known_hosts"

def enter_maintenance(sftp: pysftp.Connection) -> None:
    sftp.put(local_base_directory + maintenance_page_file,
            remote_base_directory + maintenance_page_file)
    
def exit_maintenance(sftp: pysftp.Connection) -> None:
    sftp.remove(remote_base_directory + maintenance_page_file)

def delete_r(sftp: pysftp.Connection, dir: str) -> None:
    directories = []

    def delete_file(file: str):
        if not file.endswith(maintenance_page_file):
            sftp.remove(file)

    def handle_dir(dir: str):
        directories.append(dir)
    
    def handle_default(x: str):
        print('UNKNOWN: ' + x)

    sftp.walktree(dir, 
        delete_file,              
        handle_dir,
        handle_default
    )

    directories.sort(key=lambda d : len(d), reverse=True)

    for dir in directories:
        if len (sftp.listdir(dir)) == 0:
            sftp.rmdir(dir)

def upload_app(host: str, username: str, password: str, host_key: str) -> None:

    known_hosts_file = open(known_hosts_filename, "w")
    known_hosts_file.write(host_key)
    known_hosts_file.close()

    cnopts = pysftp.CnOpts()
    cnopts.hostkeys.load(known_hosts_filename)

    print('connecting to sftp server')

    with pysftp.Connection(host, username=username, password=password, cnopts=cnopts) as sftp:
        print('entering maintenance mode')
        enter_maintenance(sftp)

        sleep(5)

        print('deleting program data')
        delete_r(sftp, remote_base_directory)

        print('uploading program data')
        sftp.put_r(local_base_directory + build_output_directory, remote_base_directory)

        print('leaving maintenance mode')
        exit_maintenance(sftp)
        

