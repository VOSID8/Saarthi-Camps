import org.apache.log4j.Logger
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._
import org.apache.spark.sql.streaming.Trigger
import org.apache.spark.sql.streaming.StreamingQuery
import org.apache.spark.sql.streaming.StreamingQueryListener
import org.apache.spark.sql.streaming.StreamingQueryListener.QueryProgressEvent
import org.apache.spark.sql.streaming.StreamingQueryListener.QueryStartedEvent
import org.apache.log4j.Level
import org.apache.spark.sql.cassandra._
import org.apache.spark.sql.DataFrame

object Admin extends App {
  val spark: SparkSession = SparkSession.builder()
    .master("local[3]")
    .appName("enrichment")
    .config("spark.streaming.stopGracefullyOnShutdown", "true")
    .config("spark.sql.shuffle.partitions", 2)
    .config("spark.cassandra.connection.host", "localhost")
    .config("spark.cassandra.connection.port", "9042")
    .config("spark.sql.extensions", "com.datastax.spark.connector.CassandraSparkExtensions")
    .config("spark.sql.catalog.lh", "com.datastax.spark.connector.datasource.CassandraCatalog")
    .getOrCreate()

  val keyspace = "camp_db"
  val table = "main"
  
  // Read data from Cassandra
  val cassandraDF = spark.read
    .cassandraFormat(table, keyspace)
    .load()
  
  // Show the original DataFrame
  println("Original DataFrame:")
  cassandraDF.show()

  // Take user input for camp ID
  print("Enter camp ID you wish to filter out/NA for if not: ")
  val inputString = scala.io.StdIn.readLine().toString

  // Filter DataFrame based on user input
  val campDF = cassandraDF.filter(col("campid") =!= inputString)

  // Show the filtered DataFrame
  println("Filtered DataFrame:")
  campDF.show()

  // Write the filtered DataFrame back to Cassandra, overwriting existing data
//   campDF.write
//     .cassandraFormat(table, keyspace)
//     .mode("Overwrite") // Use "Overwrite" to replace the existing data
//     .save()

  // Show the DataFrame after deletion
  // Stop Spark session
  spark.stop()
}
