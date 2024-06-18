# Define PostgreSQL connection variables
$PGHOST = "localhost"
$PGPORT = 5432
$PGUSER = "postgres"
$PGPASSWORD = "password"  # Replace with your actual PostgreSQL password
$DBNAME = "exptracker"
$SQL_SCRIPT = ".\create_tables.sql"  # Path to your SQL script

# Check if PostgreSQL bin directory is in PATH, add if not
$pgBinDir = "C:\Program Files\PostgreSQL\16\bin"
if (-not (Test-Path "$pgBinDir\psql.exe")) {
    Write-Host "PostgreSQL is not installed or not found in the default location."
    Write-Host "Please install PostgreSQL or update the script with the correct path."
    exit 1
}

$env:Path += ";$pgBinDir"

# Check if psql command is available
if (-not (Get-Command "psql" -ErrorAction SilentlyContinue)) {
    Write-Host "psql command not found. Ensure PostgreSQL bin directory is in PATH."
    exit 1
}

# Set the PGPASSWORD environment variable for psql command
$env:PGPASSWORD = $PGPASSWORD

# Check if the database exists and drop if it does
if ((psql -h $PGHOST -p $PGPORT -U $PGUSER -d postgres -lqt | Select-String -Pattern $DBNAME) -ne $null) {
    Write-Host "Database $DBNAME exists. Dropping the database..."
    psql -h $PGHOST -p $PGPORT -U $PGUSER -d postgres -c "DROP DATABASE $DBNAME;" -v ON_ERROR_STOP=1

    if ($?) {
        Write-Host "Database $DBNAME dropped successfully."
    } else {
        Write-Host "Failed to drop the database."
        exit 1
    }
}

# Create the new database
psql -h $PGHOST -p $PGPORT -U $PGUSER -d postgres -c "CREATE DATABASE $DBNAME;" -v ON_ERROR_STOP=1

if ($?) {
    Write-Host "Database $DBNAME created successfully."
} else {
    Write-Host "Failed to create the database."
    exit 1
}

# Execute SQL script to create tables
Write-Host "Executing SQL script to create tables..."
psql -h $PGHOST -p $PGPORT -U $PGUSER -d $DBNAME -f $SQL_SCRIPT -v ON_ERROR_STOP=1

if ($?) {
    Write-Host "Tables created successfully."
} else {
    Write-Host "Failed to create tables."
    exit 1
}
