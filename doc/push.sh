curl -X POST -H "Authorization: key=${SERVERKEY}" -H "Content-Type: application/json" -d "{
  \"to\": \"${CLIENTKEY}\",
  \"notification\": {
    \"title\": \"FCM Message\",
    \"body\": \"Hello Singularity Society\",
    \"icon\": \"./img/icons/android-chrome-192x192.png\"
  }
}" https://fcm.googleapis.com/fcm/send
