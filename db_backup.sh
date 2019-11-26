source .env
couchbackup --url "$DB_URL" --db muchmatch > backups/muchmatch_backup_"$(date +%s)".json