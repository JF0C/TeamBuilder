# Team Builder

## Setup

1. local deployment over sftp

   1. use the `sftp` commmant to access the remote file system and store the certificate fingerprint.
   1. read the fingerprints with `cat ~/.ssh/known_hosts`
   1. install virtual environment

   ```
   cd deployment
   python3 -m venv .
   source ./bin/activate
   pip3 install -r requirements.txt
   ```

2. provide secrets as environment variables in https://admin.monsterasp.net -> Websites -> {name of this website} -> Scripting -> Environment variables
   1. database connection as environment variable `ConnectionStrings__Default` from https://admin.monsterasp.net -> Databases -> {name of the database} -> Database access for hosted Websites -> Website / Local connection -> Connection string
   2. github client credentials for authentication `GithubAuthenticationConfiguration__ClientId` and `GithubAuthenticationConfiguration__ClientSecret`
