while true
do
	sleep 60
	curl -X GET "http://developer.goibibo.com/api/stats/minfare/?app_id={your-app-id}&app_key={app-key}&format=json&vertical=flight&source=BLR&destination=DEL&mode=one&sdate=20160120&edate=20160220&class=E" > fare.json
done
