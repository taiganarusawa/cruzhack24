Installation and running

Clone the repo

cd to repo

touch .env.local

inside .env.local, paste your google maps api key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="keyhere"

frontend running:

npm i --legacy-peer-deps

npm run dev

backend running:

cd bend

python3 -m venv .venv

source ./.venv/bin/activate

pip3 install -r requirements.txt

flask run