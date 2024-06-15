function importCollection() {
	mongoimport --db eventport \
		--host localhost \
		--authenticationDatabase admin \
		--username root \
		--password "${MONGO_API_DB_PASSWORD}" \
		--collection $1 \
		--file $2 \
		--jsonArray
}

importCollection "event" "src/main/resources/db/events/initial_seed.json"
