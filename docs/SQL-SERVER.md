# SQL Server + SSMS

Run this in a query window in SSMS if the database does not already exist:

```sql
IF DB_ID(N'qubrid_evalops') IS NULL
BEGIN
    CREATE DATABASE [qubrid_evalops];
END;
GO
```

Example local `.env` connection string for SQL authentication:

```env
DATABASE_URL="sqlserver://localhost:1433;database=qubrid_evalops;user=sa;password=YourStrongPassword123!;encrypt=true;trustServerCertificate=true"
```

For a Windows-authenticated local SQL Server instance, use the connection-string form appropriate to the instance/driver you installed; do not copy the SQL-auth example blindly.
